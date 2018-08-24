import React from 'react';
import { Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class Header extends React.Component {

    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    /////////redirect logout////////////////////
    //当我们进入rentalID页面 logout之后回到bookwithme的主页面，也就是rentallisting页面

    handleLogout() {
        //由于你用了hOC来让header添加了props，因此你才可以这里用THIS.PROPS.XXX
        debugger;
        this.props.logout();
        this.props.history.push('/rentals');
    }

    renderAuthButtons() {
        const {isAuth} = this.props.auth;

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



    render(){
        return (
            <nav className='navbar navbar-dark navbar-expand-lg'>
                <div className='container'>
                    <Link className='navbar-brand' to='/rentals'>BookWithMe</Link>
                    <form className='form-inline my-2 my-lg-0'>
                        <input className='form-control mr-sm-2 bwm-search' type='search' placeholder='Try ' aria-label='Search'></input>
                        <button className='btn btn-outline-success my-2 my-sm-0 btn-bwm-search' type='submit'>Search</button>
                    </form>
                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav ml-auto'>
                            {this.renderAuthButtons()}
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