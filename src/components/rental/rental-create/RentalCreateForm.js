import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputError } from '../../shared/form/InputError';
import { TextArea } from '../../shared/form/TextArea';
import { Select } from '../../shared/form/Select';
import { FileUpload } from '../../shared/form/FileUpload';
import { ResErrors } from '../../shared/form/ResError';
// import { required, minLength4 } from 'components/shared/form/validators';

const RentalCreateForm = props => {

    // handlesubmit 这个是模版格式，见register，无需质疑。 submitCB就是一个object，你写完表单之后，点submit，这些value就会存入submitCB ,就可以被传给
    // rentalcreate了

    // textarea: rows 就是能显示多少行
    // options：具体在rentalcreate 中的constructor里规定。对应shared中的select文件
   const { handleSubmit, pristine, submitting, submitCb, valid, options, errors } = props;
    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field
                name="title"
                type="text"
                label='Title'
                className='form-control'
                component={InputError}
            />
            <Field
                name="description"
                type="text"
                label='Description'
                rows='6'
                className='form-control'
                component={TextArea}
            />
            <Field
                name="city"
                type="text"
                label='City'
                className='form-control'
                component={InputError}
            />
            <Field
                name="street"
                type="text"
                label='Street'
                className='form-control'
                component={InputError}
            />
            <Field
                options={options}
                name="category"
                label='Category'
                className='form-control'
                component={Select}
            />
            <Field
                name="image"
                label='Image'
                component={FileUpload}
            />
            <Field
                name="bedrooms"
                type="number"
                label='Bedrooms'
                className='form-control'
                component={InputError}
            />
            <Field
                name="dailyRate"
                type="text"
                label='Daily Rate'
                className='form-control'
                symbol='$'
                component={InputError}
            />
            <Field
                name="shared"
                type="checkbox"
                label='Shared'
                className='form-control'
                component={InputError}
            />
            <button className='btn btn-bwm btn-form' type="submit" disabled={!valid || pristine || submitting}>
                Create Rental
            </button>
            <ResErrors errors={errors} />
        </form>
    )
}

//规定起始值，不然他俩没有起始值就不合常理
export default reduxForm({
    form: 'rentalCreateForm',
     initialValues: { shared: false, category: 'apartment'}
})(RentalCreateForm)