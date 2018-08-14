import React from 'react';
import {RentalList} from './RentalList';
import {connect} from 'react-redux';
import * as actions from '../../../actions';

////////////////////// rentallisting 用来转化state TO PROPS, render 租房总页面////////////////////////

// remove this export, because 我们已经在下面export了，不能export两次
class RentalListing extends React.Component {

    // create a state, have to import super first,
    // father is rentallist, child is rentalcard,which are the components in the rental list array
    // data 也是用PROPS来由parent rental list传给 child rentalcard

    // constructor() {
    //     super();
    //     this.state = {
    //        // rentals:[1,2,3]
    //        // data部分 由于引入redux，移入APP JS
    //
    //     }
    //
    //     this.addRental = this.addRental.bind(this);
    // }

    //to iterate the rentals array, and each element is a rental card
    // map的input叫啥不重要，它表示RENTALS ARRAY的元素
    // KEY = {INDEX} 是react语法要求，没什么特殊含义。
    // rental card de props 叫做COLNUM,
    //rental ={rental} 这个意思就是说，因为我们在constructor中把data assign给了rental array，然后我们在child rentalcard中
    // 要把它的各个参数都转化为data中的参数，这样我们需要把这个data array传给rental card，我们知道map中的input rental就是指代dataarray中的每一个元素
    // 所以我们设一个PROP 参数 rental，当然你也可以叫别的，但是要保证和card中的参数名称一致，把input rental赋值给这个rental变量就可以了。然后
    // 在rentalcard中，设个CONST 拿到这个PROPS参数，就可以对rental card中的各个部分进行命名了。

    //this.props.rentals（也就是rental array）让它里面的每一个元素RENTAL, 用变量rental来标记

    // renderRentals() {
    //     return this.props.rentals.map((rentalelement, index) => {
    //         // debugger;
    //         return (
    //             <RentalCard key={index}
    //                         colNum='col-md-3 col-xs-6'
    //                         rental={rentalelement}/>
    //         )
    //     });
    // }


/////////////////////////////dispatch////////////////////
    //我们用dispatch把actions中得到的rental array返回给props or state???，然后用map ???
    componentWillMount() {
        //debugger;
        this.props.dispatch(actions.fetchRentals());
    }


    //那么这个code的顺序就是，我们先run这个render，进去后它会call renderrentals这个遍历函数，
    // 遍历函数会遍历this.state.rentals这个array，然后callback function就是返回每一个array元素
    // 而且你会发现展示元素的个数和你写的rentals的个数一样，你写3个就有3个card，4就是4个 card
    render() {
        return (
            <section id='rentalListing'>
                <h1 className='page-title'>Your Home All Around the World</h1>
                    {/*{this.renderRentals()}*/}
                    <RentalList rentals={this.props.rentals}/>

                {/*<button onClick={this.addRental}> Add Rental!</button>*/}
                {/*<button onClick={() => {this.addRental()}}> Add Rental! </button>*/}
            </section>

        )
    }

    //我们设一个button function
    // button click函数, increasing rental by clicking the button
    // 这里值得注意的是this.state.rental中的this我们没有规定， 所以你在onclick中call它要么用arrow function来
    //自动绑定this，要么你要重新规定一下this，在constructor中。


    // addRental() {
    //     const rentals = this.props.rentals;
    //     rentals.push(1);
    //
    //     //我们要重新set一下state，因为我们改变了array，这个会recall rental array
    //     this.setState({
    //         rentals
    //     })
    // }

}

//这个为什么不写在class的里面？它不是CLASS内部功能，它就是一个连接class的state TO PROPS的功能，它从来没被call过，
// 这里的rentals需要的是data，如果你只写state.rentals 它们返回的object， rentals仍然为空
function mapStateToProps(state) {
    // debugger;
    //这里的参数rental，是由 reducer index中 return的
    return {
        rentals: state.rentals.data
    }
}


export default connect(mapStateToProps)(RentalListing)