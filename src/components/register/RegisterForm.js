import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {InputError} from 'components/shared/form/InputError';
import {ResErrors} from "../shared/form/ResError";

const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCB, valid, errors } = props;
    return (

        <form onSubmit={handleSubmit (submitCB)}>

                    <Field
                        name="username"
                        type="text"
                        label ='Username'
                        className = 'form-control'
                        component={InputError}
                    />

                    <Field
                        name="email"
                        type="email"
                        label ='Email'
                        className = 'form-control'
                        component={InputError}
                    />

                    <Field
                        name="password"
                        type="password"
                        label ='Password'
                        className = 'form-control'
                        component={InputError}
                    />

                    <Field
                        name="passwordConfirmation"
                        type="password"
                        label ='PasswordConfirmation'
                        className = 'form-control'
                        component={InputError}
                    />


                <button className='btn btn-bwm' type="submit" disabled={!valid || pristine || submitting}>
                    Register
                </button>
                <ResErrors errors={errors}/>

        </form>
    )
};

const validate = values => {
    const errors = {};

    if (values.username && values.username.length < 4) {
        errors.username = 'Username min length is 4 characters!';
    }
    if (!values.email) {
        errors.email = 'Email Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Please enter password confirmation';
    }
    if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must be the same';
    }


    return errors;
};


export default reduxForm({
    form: 'registerForm', // a unique identifier for this form
    validate
})(RegisterForm)