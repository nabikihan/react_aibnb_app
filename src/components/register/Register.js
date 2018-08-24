import React from 'react';
import RegisterForm from './RegisterForm';
import {Redirect} from 'react-router-dom';

import * as actions from '../../actions';

export class Register extends React.Component{

 ////////////////////show errors/////////////////////////////////////
    // 我们要把error放到state中，然后update state，所以我们建立constructor

constructor() {
    super();

    this.state={
        errors:[],
        redirect: false
    };

    // 当我们把error也作为state更新了之后，出现了混乱。你看在registeruser中，errors有作为它的结果出现，
    //而render中，registeruser和errors都作为props参数，那么registeruser是属于window this，而error是由 this.setSTATE来规定的。
    // 但是这个this.setSTATE 会UNDEFINED ，？？？
    //我们要把它们都归为windowthis中的component， 要么你在render中用arrow function，要么你这么写

    this.registerUser = this.registerUser.bind(this);
}


////////////////////////////////send userdata to server and get response////////////////////////////////////
    //先去ACTION 中的index.JS中，把userdata传给server，从server中拿到response之后，回到这里返回结果。此时database已经加入了新用户
    registerUser(userData) {
        actions.register(userData)
               .then(
                   registered => this.setState({redirect: true}),
                   errors=> this.setState({errors})
                   );
    }

    render() {
        const {errors, redirect} = this.state;

        if (redirect) {
            return <Redirect to={{pathname: '/login', state: {successRegister: true}}}/>
        }
        return (
            <section id='register'>
                <div className='bwm-form'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <h1>Register</h1>
                            <RegisterForm submitCB ={this.registerUser} errors={errors}/>

                        </div>
                        <div className='col-md-6 ml-auto'>
                            <div className='image-container'>
                                <h2 className='catchphrase'>As our member you have access to most awesome places in the world.</h2>
                                <img src={process.env.PUBLIC_URL + '/image/register-image.jpg'} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

}