import React from 'react';
import Modal from 'react-responsive-modal';
import { pretifyDate } from '../../../helpers';

export class RentalManageModal extends React.Component {

    constructor() {
        super();

        this.state = {
            open: false
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({open: true});
    }

    closeModal() {
        this.setState({open: false});
    }


    //react.fragment, render要求对于要返回多个标签时，要打包成一个整体
    // <hr><hr> 这个就是画一条线作为分节符， 这里的条件是，当当前的index 不是book array的最后一个元素的时候，我们就显示一个分节符
    renderBookings(bookings) {
        return bookings.map((booking, index) =>
            <React.Fragment>
                <p><span>Date:</span> {pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)}</p>
                <p><span>Guests:</span> {booking.guests}</p>
                <p><span>Total Price:</span> {booking.totalPrice} $</p>
                { index + 1 !== bookings.length &&
                <hr></hr>
                }
            </React.Fragment>
        )
    }

    render() {

        //从rentalmanagecard中传入，而且已经确定有book的数据
        const { bookings } = this.props;

        return (
            <React.Fragment>
                <button type='button' onClick={this.openModal} className='btn btn-bwm'>Bookings</button>
                <Modal open={this.state.open} onClose={this.closeModal} little classNames={{ modal: 'rental-booking-modal' }}>
                    <h4 className='modal-title title'>Made Bookings</h4>
                    <div className='modal-body bookings-inner-container'>

                        {this.renderBookings(bookings)}

                    </div>
                    <div className='modal-footer'>
                        <button type='button' onClick={this.closeModal} className='btn btn-bwm'>Cancel</button>
                    </div>
                </Modal>
            </React.Fragment>
        )
    }
}