import React from 'react';
import * as actions from '../../../actions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';


//我们用state来取出从server得到的数据
export class RentalManage extends React.Component {

    constructor() {
        super();

        this.state = {
            userRentals: [],
            errors: [],
            isFetching: false
        }

        this.deleteRental = this.deleteRental.bind(this);
    }


    // after we get the data from actions(server), then we need to setstate

    // isfetching这个参数我们在book manage里讲过了
    componentWillMount() {
        this.setState({isFetching: true});

        actions.getUserRentals().then(
            userRentals => this.setState({userRentals, isFetching: false}),
            errors => this.setState({errors, isFetching: false}))
    }

//////////////////show rental list////////////////////////////////////
    renderRentalCards(rentals) {

        //在iterate rental list的同时（作为rental card），我们把modal也传入rental manage card， 同时把 booking传给莫大了
       return rentals.map((rental, index) =>
            <RentalManageCard modal={<RentalManageModal bookings={rental.bookings}/>}
                              key={index}
                              rental={rental}
                              rentalIndex={index}
                              deleteRentalCb={this.deleteRental} />);
    }

//////////////////delete rental////////////////////////////////////
//删除租主的无用rental， 在rental manage card中
    // then中有两个 callback函数，一个是从actions（from server）中得到的data，另一个是得到的error，两种情况
    // rentalid 这个是actions中的delete函数的参数，我们写server的delete rental的时候也是用到了这个参数，而rentalindex是要被delete的这个rental
    //的当前位置（array的index）， 而你的这个delete函数被iteration（render rental cards这个函数）传给rental manage card， 在rental manage card的render部分调用
    //会把这两个input传给delete函数，其中 rental index这个参数是由iteration的时候直接传入的。

    deleteRental(rentalId, rentalIndex) {
        actions.deleteRental(rentalId).then(
            () => this.deleteRentalFromList(rentalIndex),
            errors => toast.error(errors[0].detail))
    }


    //这个就是JavaScript从一个array remove一个元素，用splice(index, howmany, item1, ..., itemx)， 然后update一下这个rental array在state中的结果
    deleteRentalFromList(rentalIndex) {

        //这个就是我们copy了rental list给一个新建的参数user rental，.SLICE()中不加任何input，就是做一个简单的copy，不remove任何东西。
        const userRentals = this.state.userRentals.slice();
        userRentals.splice(rentalIndex, 1);

        this.setState({userRentals});
    }






    render() {

        // return (
        //     <h1> I am Rental Manage Component</h1>
        // )

        //  同理 book manage

        const { userRentals, isFetching } = this.state;

        return (
            <section id='userRentals'>
                <ToastContainer />
                <h1 className='page-title'>My Rentals</h1>
                <div className='row'>
                    {this.renderRentalCards(userRentals)}
                </div>
                { !isFetching && userRentals.length === 0 &&
                <div className='alert alert-warning'>
                    You dont have any rentals currenty created. If you want advertised your property
                    please follow this link.
                    <Link style={{'marginLeft': '10px'}} className='btn btn-bwm' to='/rentals/new'>Register Rental</Link>
                </div>
                }
            </section>
        )
    }
}