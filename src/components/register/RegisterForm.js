import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {InputError} from 'components/shared/form/InputError';
import {ResErrors} from "../shared/form/ResError";

//我们把validation的render field 移动到shared folder里面的input


// 从REDUX FORM的模版copy过来的。
// valid就是控制button的。如果有任何的error发生，则disable button， pristine就是空表单不可以
const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCB, valid, errors } = props;

    //这样，当我们填好表单，然后click submit的时候，这个values就拿到了你的input，
    //我们希望当我们click submit之后，我们可以把这些values传给register，它接下来可以redux
    //我们的做法是pass 这个 submitfunction TO props。见register.js
    //我们用props的callbackfunction来替代values
    //{/*<form onSubmit={handleSubmit ((values) => {*/}
    //{/*debugger;*/}
    //{/*})}>*/}

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

{/*//////////////////////display errors//////////////////////////////////////////*/}
{/*// map就是遍历，这里我们遍历了errors，因为可能有多个error，而且我们设的errors是个array。我们把这部分的code移动到shared里面*/}
            <ResErrors errors={errors}/>

        </form>
    )
};

//这个values我们用debugger验证过了，就是你input啥，它就会得到什么，但是注意它是个object，里面有你在form中设置的各种参数
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