import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputError } from '../../shared/form/InputError';
import { TextArea } from '../../shared/form/TextArea';
import { Select } from '../../shared/form/Select';
import { FileUpload } from '../../shared/form/FileUpload';
import { ResErrors } from '../../shared/form/ResError';

const RentalCreateForm = props => {

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

export default reduxForm({
    form: 'rentalCreateForm',
     initialValues: { shared: false, category: 'apartment'}
})(RentalCreateForm)