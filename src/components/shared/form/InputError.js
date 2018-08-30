import React from 'react';


//我们把register validation的error message show 出来, 我们把这个CONST 传给 registerform中的每个元素

// symbol for dailyrate dollar sign
export const InputError = ({
                         input,
                         label,
                         type,
                         symbol,
                         className,
                         meta: { touched, error, warning }
                     }) => (
    <div className='form-group'>
        <label>{label}</label>
        <div className='input-group'>
            { symbol &&
            <div className='input-group-prepend'>
                <div className='input-group-text'>{symbol}</div>
            </div>
            }
            <input {...input} type={type} className={className}/>
        </div>
        {touched &&
        ((error && <div className='alert alert-danger'>{error}</div>))}

    </div>
);