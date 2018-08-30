import React from 'react';

//用来 RENTAL CREATE FORM中的optioN， 做一个option下拉框///////
// options就是 house，apartment，之类的category，是个array
export const Select = ({
                              input,
                              label,
                              options,
                              className,
                              meta: { touched, error, warning }
 }) => {

    //遍历options中的每一个元素，然后用render把他们显示出来
    // 在render中不用写this，因为renderoptions不是个class component
    function renderOptions() {
        return options.map((option, index) => {
            return <option key={index} value={option}> {option} </option>
        });
    }

    return (
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-group'>
                <select {...input} className={className} >
                    {renderOptions()}
                </select>
            </div>
            {touched &&
            ((error && <div className='alert alert-danger'>{error}</div>))}
        </div>
    )
}