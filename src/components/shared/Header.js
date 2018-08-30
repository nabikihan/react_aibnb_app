import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import RentalSearchInput from '../rental/RentalSearchInput';

class Header extends React.Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

////////////////////////////redirect logout////////////////////
    //当我们进入rentalID页面 logout之后回到bookwithme的主页面，也就是rentallisting页面

    handleLogout() {
        //由于你用了hOC来让header添加了props，因此你才可以这里用THIS.PROPS.XXX
        debugger;
        this.props.logout();
        this.props.history.push('/rentals');
    }

    renderAuthButtons(isAuth) {

        if (isAuth) {
            return <a className='nav-item nav-link clickable' onClick={this.handleLogout}>Logout</a>
        }

        //这里我们要用react fragment，否则这两个button就是上下的位置
        return (
            <React.Fragment>
                <Link className='nav-item nav-link active' to='/login'>Login <span className='sr-only'>(current)</span></Link>
                <Link className='nav-item nav-link' to='/register'>Register</Link>
            </React.Fragment>
         )
    }



////////////////////显示username 以及 汉堡包下拉框//////////////////////////////////
    renderOwnerSection(isAuth) {
        if (isAuth) {
            return (
                <div className="nav-item dropdown">
                    <a className="nav-link nav-item dropdown-toggle clickable" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Owner Section
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to="/rentals/new">Create Rental</Link>
                        <Link className="dropdown-item" to="/rentals/manage">Manage Rentals</Link>
                        <Link className="dropdown-item" to="/bookings/manage">Manage Bookings</Link>
                    </div>
                </div>
            )
        }
    }


    render(){

        //显示username, 你设置这个isAUTH ，就是为了当你login的时候，才会显示username，LOGOUT的时候则不会显示
        const {username, isAuth} = this.props.auth;

        return (
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
                    <RentalSearchInput/>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>

                            { isAuth &&
                            <a className='nav-item nav-link'>{username}</a>
                            }
                            {this.renderOwnerSection(isAuth)}
                            {this.renderAuthButtons(isAuth)}
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}


// HOC, 这样我们可以让header有AUTH properties, 也就是把它加到props中。
export default withRouter(connect(mapStateToProps)(Header))
//export default connect(mapStateToProps)(Header)