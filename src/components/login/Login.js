import React from 'react';
import LoginForm from './LoginForm';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import * as actions from "../../actions";


class Login extends React.Component{

    constructor(){
        super();
        this.loginUser = this.loginUser.bind(this);
    }

    //我们把PROPS中的userdata（loginform中的input） dispatch给actions中的login，那里action creator会把user data发送给server，拿到response之后，去
    //reducer中更新state，发给这里下面的map，就可以用更新的state中的参数了。
    loginUser(userData) {
        this.props.dispatch(actions.login(userData));
    }

    render() {

  /////////route////////////
        // 这个是在map更新的state之后，state转化为props，那么AUTH reducer中的各种参数这里就可以调用了。
        //这successregister是我们在redirect register成功了之后，update给state的一个参数，这里
        // 的false必须写，因为当你没有成功register的时候，你点login button，给出跳出error，说你的这个location.state就是undefined。。。
        const {isAuth, errors} = this.props.auth;
        const {successRegister} = this.props.location.state || false;

        if (isAuth) {
            return <Redirect to={{pathname: '/rentals'}}/>
        }

        return (
            <section id="login">
                <div className="bwm-form">
                    <div className="row">
                        <div className="col-md-5">
                            <h1>Login</h1>

                            {
                               successRegister &&
                                   <div className='alert alert-success'>
                                       <p> You have been successfully registered, please login now.</p>
                                   </div>
                            }
                            <LoginForm submitCB ={this.loginUser} errors={errors}/>
                        </div>
                        <div className="col-md-6 ml-auto">
                            <div className="image-container">
                                <h2 className="catchphrase">Hundreds of awesome places in reach of few clicks.</h2>
                                <img src={process.env.PUBLIC_URL + '/image/login-image.jpg'} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}

// state是从REDUCER里面取出来的，然后render里面会用state.AUTH
function mapStateToProps(state){
    return{
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Login)