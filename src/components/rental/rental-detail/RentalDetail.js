import React from 'react';
import {connect} from 'react-redux';

import * as actions from '../../../actions';


class RentalDetail extends React.Component{

/////////////////////////////dispatch////////////////////
// we will dispatch action with rentalID
    componentWillMount() {
        const rentalId = this.props.match.params.id;
        this.props.dispatch(actions.fetchRentalById(rentalId));
    }
    render() {
       // debugger;
        const rental = this.props.rental;

        // if rental.id exist, return data...
        if (rental.id) {
            return(
                <div>
                    <h1>{rental.title} </h1>
                    <h1>{rental.city} </h1>
                    <h1>{rental.description} </h1>
                    <h1>${rental.dailyRate} </h1>
                </div>
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