import React from 'react';
import {connect} from 'react-redux';
import {RentalDetailInfo} from "./RentalDetailInfo";
import {RentalMap} from "./RentalMap";


import * as actions from '../../../actions';


class RentalDetail extends React.Component{

/////////////////////////////dispatch////////////////////
// we will dispatch action with rentalID


    //
    // If you notice in App.js we have routes
    //
    // and route to detail page is like this :<Route exact path='/rentals/:id' component={RentalDetail} />
    // so when you navigate to this page lets say  - /rentals/786asdsa8d67adas8
    // you can access this value on props.match.param.id because we specified route like this
    // path='/rentals/:id'   -> props.match.params.id
    // if it would be
    // path='/rentals/:_id'   ->  props.match.params._id
    // path='/rentals/:someId'   -> props.match.params.someId
    // soo that's why :slightly_smiling_face:
    // maybe you was confused because we have rental._id
    // but rental is comming from server
    // and this 2 ids are completly different
    // they are same by value , but different sources

    componentWillMount() {

        const rentalId = this.props.match.params.id;
        this.props.dispatch(actions.fetchRentalById(rentalId));

    }
    render() {

        const rental = this.props.rental;

        // if rental.id exist, return data...
        if (rental._id) {
            return(

                // fa 就是font awesome， 各种icon
                //这里你必须把rental这个props传给rental detail info，因为它会用到
                <section id='rentalDetails'>
                    <div className='upper-section'>
                        <div className='row'>
                            <div className='col-md-6'>
                                <img src={rental.image} alt=''></img>
                            </div>
                            <div className='col-md-6'>
                                <RentalMap location={`${rental.city}, ${rental.street}`}/>
                            </div>
                        </div>
                    </div>

                    <div className='details-section'>
                        <div className='row'>
                            <div className='col-md-8'>
                               <RentalDetailInfo rental={rental}/>
                            </div>
                            <div className='col-md-4'> BOOKING</div>
                        </div>
                    </div>
                </section>
            )
        } else {
           return(
               <h1>Loading...</h1>
           )
        }

    }
}


function mapStateToProps(state) {
     //debugger;
    //这里的参数rental，是由 reducer index中 return的
    return {
        rental: state.rental.data
    }
}

export default connect(mapStateToProps)(RentalDetail)


// this is a seperate page to show the detail rental page from a rental card
// we use redux, mimic rentallist