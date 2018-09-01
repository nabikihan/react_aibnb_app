import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BookingCard } from './BookingCard';

import * as actions from '../../../actions';

export class BookingManage extends React.Component {

    componentWillMount() {
        this.props.dispatch(actions.fetchUserBookings());
    }

    //注意，这个bookINGS 是个data，所以我们才能iterate，是个array。所以我们在render中的CONST中规定它是data。

    renderBookings(bookings) {
        return bookings.map((booking, index) => <BookingCard booking={booking} key={index} />);
    }

    render() {

        // return (
        //     <h1> I am booking Manage Component</h1>
        // )

        // 注意，这里this.props.userBookings这个是个object，你要iterate的是booking data，是个array，因此这里规定CONST
        //首先你要从props中取出从stores得到的bookING object，然后你要标明我只用data


        //isFetching是我们在reducer book中设的一个参数，它就是表明我们在 fetching data from server
       const { data: bookings, isFetching } = this.props.userBookings;



       return (

           // {/*<div>*/}
           //     {/*{userBookings.data.map((booking) =>{*/}
           //         {/**/}
           //            {/*<p> {booking.startAt} - {booking.endAt}</p>*/}
           //         {/**/}
           //     {/*})}*/}
           // {/*</div>*/}

            <section id="userBookings">
                <h1 className="page-title">My Bookings</h1>
                <div className="row">
                    { this.renderBookings(bookings) }
                </div>

                {/*isfetching 为false，说明我们已经从server fetch data完毕，已经拿到一个response*/}
                { !isFetching && bookings.length === 0 &&
                    <div class="alert alert-warning">
                        You have no bookings created go to rentals section and book your place today.

                        {/*如果当前booking为空， 则就用link 去rentals的page*/}
                        <Link style={{'margin-left': '10px'}} class="btn btn-bwm" to="/rentals">Available Rental</Link>
                    </div>
                }
            </section>
        )
    }
}


// get the updated bookING data from reducer
function mapStateToProps(state) {
    return {
        userBookings: state.userBookings
    }
}

export default connect(mapStateToProps)(BookingManage)