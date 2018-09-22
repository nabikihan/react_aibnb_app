import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {required, minLength4} from "../shared/form/LoginValidators";
import {InputError} from "../shared/form/InputError";
import {ResErrors} from "../shared/form/ResError";

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitCB, valid, errors} = props;

    return (

        <form onSubmit={handleSubmit (submitCB)}>

            <Field
                name="email"
                type="email"
                label ='Email'
                className = 'form-control'
                component={InputError}
                validate = {[required, minLength4]}
            />

            <Field
                name="password"
                type="password"
                label ='Password'
                className = 'form-control'
                component={InputError}
                validate = {required}
            />


            <button className='btn btn-bwm' type="submit" disabled={!valid || pristine || submitting}>
                Login
            </button>

            <ResErrors errors={errors} />
        </form>

    )
}


export default reduxForm({
    form: 'loginForm', // a unique identifier for this form
})(LoginForm)