import React from 'react';
import {RentalList} from './RentalList';
import {toUpperCase} from "../../../helpers";
import {connect} from 'react-redux';
import * as actions from 'actions';

class RentalSearchListing extends React.Component{

    constructor(){
        super();

        this.state={
            searchedCity: ''
        }
    }

/////////// get city para from route and dispatch to actions
    componentWillMount() {
        this.searchRentalsByCity();
    }


    searchRentalsByCity() {

        const searchedCity = this.props.match.params.city;
        this.setState({searchedCity});

        // to actions
        debugger;
        this.props.dispatch(actions.fetchRentals(searchedCity));
    }


/////////////////////////handle 多次search, 和 rentalsearchinput关联////////////////////////
    componentDidUpdate(prevProps) {
        const currentUrlParam = this.props.match.params.city;
        const prevUrlParam = prevProps.match.params.city;

        if (currentUrlParam !== prevUrlParam) {
            this.searchRentalsByCity();
        }
    }


///////////to handle errors from actions in case fetch rental fails
    renderTitle() {
        const { errors, data } = this.props.rentals;
        const { searchedCity } = this.state;
        let title = '';

        //注意这两个if的先后关系和写法，例如我们输入一个不存在的city，那么action会给我们一个error，而error的起始值是个empty array（见reducer中的设置），
        //由于REDUCER-INDEX会先跑init function ，所以最开始error为空，如果你这里把两个if写成了if else，则它就会先显示data（这时data在else中，无论data是否为空），
        // 都会被显示，所以当你输入一个不存在的city，你的网页会先显示YOUR HOME IN CITY OF XXX, 然后再显示error（因为dispatch action之后才去update data/error）
        // 所以，这里我们这样写，避免这个问题
        if (errors.length > 0) {
            title = errors[0].detail;
        }

        if(data.length > 0) {
            title = `Your Home in City of ${toUpperCase(searchedCity)}`;
        }

        return <h1 className="page-title">{title}</h1>
    }

    render(){
        return(
            <section id='rentalListing'>
                {this.renderTitle()}
                <RentalList rentals={this.props.rentals.data}/>
            </section>
        )
    }

}

function mapStateToProps(state) {
    return {
        rentals: state.rentals
    }
}

export default connect(mapStateToProps)(RentalSearchListing)