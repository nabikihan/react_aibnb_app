import React from 'react';
import {Cacher} from "../../services/cacher";

import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Circle, InfoWindow
} from "react-google-maps";

/////////// this  will return google map, 两种写法都可以。

//const MapComponent = (props) => {
//     return (
//         <GoogleMap
//             defaultZoom={8}
//             defaultCenter={{ lat: -34.397, lng: 150.644 }}
//         >
//             <Marker
//                 position={{ lat: -34.397, lng: 150.644 }}
//             />
//         </GoogleMap>
//     )
// };


/////////////我们整个这个页面的code就是为了得到当前的location。
//当APP.JS call rentaldetail的route的时候，rentaldetail会call rentalmap，同时把location（from ）database 作为props传给rentalmap， rentalmap会call MapWithGeocode
//同时把props传给它
//我们看最后一行的输出，它suppose是给rentalmap（展示图片）提供location的，那么它会call map component，这个时候props已经跟着传进来了
//MapComponent： 根据模版，我们要把current location替换模版中的假经纬度， 但是这是，coordinates为0，因为我们虽然有了props的参数，但是它刚从我们database拿到街道，它不知道什么是经纬度。
// 所以要通过HOC来update coordination。 我们通过GEOCODE来做
//GEOCODE（HOC）：根据Google给提供的模版，我们规定一下constructor，然后从props中得到location，通过GEOCODER把location换成经纬度，然后用HOC update一下就可以了
// 最后 更新一下MAPCOMPONENT中的props就可以了。

function MapComponent(props) {

    //const coordinates = props.coordinates;这两种写法都可以
     const {coordinates, isError, isLocationLoaded} = props;

     // 学习条件的写法
    // inforwindow 自带的Maxwidth，去Google map API网站check一下info window 的其他function。
    // disableUI, 当我们出现error message的时候，我们在地图上不要show zoomin 小人之类的
    return (
        <GoogleMap
            defaultZoom={13}
            //原来的模版这里都是规定好的假数字 defaultcenter={{lat: 234, lng: 333}}
            defaultCenter={coordinates}
            center ={coordinates}
            options ={{disableDefaultUI: isError? true: false}}
        >
            {isLocationLoaded && !isError && <Circle center ={coordinates} radius ={500} />}

            {isLocationLoaded && isError &&
            <InfoWindow position={coordinates} options={{maxWidth: 300}}>
                <div>
                    Uuuuups, there is problem to find location on the map, we are trying to resolve
                    problem as fast as possible. Contact host for additional informations if you are
                    still interested in booking this place. We are sorry for incoviniance.
                </div>
            </InfoWindow>}

        </GoogleMap>
    )
}


////////////////////////////HOC, let's update our props with geo code////////////////////////////

//我们设这个 islocationloaded，就是因为，在error的时候，总是先出现个黑色circle，然后才显示error message，这是因为我们的iserror的初始值为
// false，这样，无论之后有error还是没有，都会先run circle那个条件。所以，会出现一个黑色圆圈。
//我们多设一个flag，这样，起始值它是false，所以它不会先走circle那个条件，知道开始找location之后才会变为true，这时才会显示map 或者 error
function withGeocode(WrapperComponent) {
    return class extends React.Component{

        constructor() {
            super();

            this.cacher = new Cacher();

            this.state ={
                coordinates: {
                    lat: 0,
                    lng: 0
                },
                isError: false,
                isLocationLoaded: false

            }
        }

        // 这个就是用来dispatch的, 用来call里面的function的。
        componentWillMount() {
            this.getGeocodeLocation();
        }


        updateCoordinates(coordinates) {
            this.setState({
                coordinates,
                isLocationLoaded: true
            });
        }


        // promise, 因为可能没有成功得到想要的结果， 返回的就是reject，两种情况
        geocodeLocation(location) {

           const geocoder = new window.google.maps.Geocoder();

           return new Promise((resolve, reject) => {

               // follow Google给的模版， result[0]的原因是，rentaldetail从 database 拿到的就是rental list中的一个元素，但是input是个array，也即是说
               //这个result array它只有一个元素
               geocoder.geocode({address: location}, (result, status) => {

                   if (status === 'OK') {
                       const geometry = result[0].geometry.location;
                       const coordinates = {lat: geometry.lat(), lng: geometry.lng()};

                       this.cacher.cacheValue(location, coordinates);

                       // we need to pass this state to wrappercomponent
                       this.setState({coordinates});

                       resolve(coordinates);
                   } else {
                       reject('ERROR!!');
                   }
               });

           });
        }

        //这里test error的时候，设一个错误的location一定要加上符号，如果只是含有字母，则map还是能找到，可能当成某个街道了。
        getGeocodeLocation() {
            const location = this.props.location;

            // set random location to check error message
            // let location = this.props.location;
            // if (Math.floor(Math.random() * 10) > 5) {
            //    location = 'abs879wr8hrweohfsweq43434$$$$#@';
            // }


           //////////////cacher////////////////////////////

            if (this.cacher.isValueCached(location)) {
                this.updateCoordinates(this.cacher.getCacheValue(location));
            } else {
                this.geocodeLocation(location)
                    .then(
                        (cooridinates) => {
                            this.updateCoordinates(cooridinates);
                        },
                        (error) => {
                            this.setState({isLocationLoaded: true, isError : true});
                        }
                    );
            }
        }


        render() {
            return (
                <WrapperComponent {...this.state}/>
            )
        }
    }
}


// withscriptjs, 和 withGooglemap，这两个是Google map自带的，它就是给你导入map API的功能，让你显示map。
// 你import Google map，它还给你提供了更多的function，你通过inspect -> console -> type window.Google.map,来check还有哪些功能。
export const MapWithGeocode = withScriptjs(withGoogleMap(withGeocode(MapComponent)));

