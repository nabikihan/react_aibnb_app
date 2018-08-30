import React from 'react';
import { withRouter } from 'react-router-dom';

class RentalSearchInput extends React.Component{
    constructor() {
        super();

        //通过React.createRef()来创建searchinput这个参数，并且把它与input关联，也就是你的input是啥，这个input就被
        //转化为这个searchinput参数
        this.searchInput = React.createRef();
    }

    //输入的city的格式，我们在server中已经设为都用小写
    handleSearch() {
        const {history} = this.props;
        const city = this.searchInput.current.value;

        city? history.push(`/rentals/${city}/homes`) : history.push('/rentals');
    }


    ////////handle 键盘点击enter////////////
    handleKeyPress(event) {

        if (event.key === 'Enter') {
            this.handleSearch();
        }
    }


    ////////对于handle 多次search，在rentalsearch listing中////////////




    render() {
        return(
            <div className='form-inline my-2 my-lg-0'>
                <input onKeyPress={(event) => { this.handleKeyPress(event)}}
                       ref = {this.searchInput}
                       className='form-control mr-sm-2 bwm-search'
                       type='search'
                       placeholder='Try "New York"'
                       aria-label='Search'></input>
                <button onClick={() => {this.handleSearch()}}
                        className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search'
                        type='submit'>Search</button>
            </div>
        )
    }
}

export default withRouter(RentalSearchInput)