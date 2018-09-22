import React from 'react';
import Modal from 'react-responsive-modal';
import {ResErrors} from "../shared/form/ResError";

//////////////////////reserve button, show confirmation /////////////////////////////////

export function BookingModal(props) {
    const {open, closeModal, booking, confirmModal, rentalPrice, errors} = props;

    return (

        <Modal open={open} onClose={closeModal} little classNames={{ modal: 'booking-modal' }}>
            <h4 className='modal-title title'>Confirm Booking </h4>
            <p className='dates'>{booking.startAt} / {booking.endAt}</p>
            <div className='modal-body'>
                <em>{booking.days}</em> nights /
                <em>{rentalPrice}$</em> per Nights
                <p>Guests: <em>{booking.guests}</em></p>
                <p>Price: <em>{booking.totalPrice}$ </em></p>
                <p>Do you confirm your booking for selected days?</p>
            </div>

            <ResErrors errors={errors}/>
            <div className='modal-footer'>
                <button onClick={confirmModal} type='button' className='btn btn-bwm'>Confirm</button>
                <button type='button' onClick={closeModal} className='btn btn-bwm'>Cancel</button>
            </div>
        </Modal>
    )

}


