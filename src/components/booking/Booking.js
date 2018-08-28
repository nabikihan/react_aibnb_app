import React from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import {getRangeOfDates} from "../../helpers";
import {BookingModal} from "./BookingModal";
import { ToastContainer, toast } from 'react-toastify';

import * as moment from 'moment';
import * as actions from '../../actions';


export class Booking extends React.Component {

    constructor() {
        super();

        // existing bookings
        this.bookedOutDates = [];
        this.checkInvalidDates = this.checkInvalidDates.bind(this);
        this.cancelConfirmation = this.cancelConfirmation.bind(this);

        // for input 就是当你在日历上选择好日期之后，input的那个空给你显示出你选择的日期
         this.dateRef = React.createRef();

        //for get value, 我们setup好state
        this.state = {

            proposedBooking:{
                startAt: '',
                endAt: '',
                guests: ''

            },

            modal:{
                open: false
            },

            errors: []
        };
        this.handleApply = this.handleApply.bind(this);

        // bind render context to reserverental
        this.reserveRental = this.reserveRental.bind(this);
    }

    // 这个就是为了call一下内部的function，没啥意义。
    componentWillMount() {
      this.getBookedOutDates();
    }

    getBookedOutDates() {
        const {bookings} = this.props.rental;
        if (bookings && bookings.length > 0) {
            bookings.forEach(booking => {
                //console.log(booking);，can be checked in inspect-console window

                // add existing daterange to the exsiting booking array, 你inspect-CONSOLE ， 你就看到existingbooking的每一天
                // from helpers
                const dateRange = getRangeOfDates(booking.startAt, booking.endAt, 'Y/MM/DD');
                this.bookedOutDates.push(...dateRange);
                // console.log(this.bookedOutDates);
            });
        }
    }

//////////////////////disable existing dates////////////////////
// 条件是，1）当前时间大于 existing dates； 2）existing dates在 existing array里面
    // moment为existing dates， 'DAYS' 为当前时间
   checkInvalidDates(date) {
      return this.bookedOutDates.includes(date.format('Y/MM/DD')) || date.diff(moment(), 'days') < 0;
   }

//////////////////////get value of input date/////////////////////
    //picker.startdate为picker自带的, 它会把你的input，在calendar上面的选择pick上，然后显示出来。
    // react ONAPPLY的应用，见笔记
    handleApply(event, picker) {
       //alert('CLICKED');

        const startAt = picker.startDate.format('Y/MM/DD');
        const endAt = picker.endDate.format('Y/MM/DD');

        // input 就是当你在日历上选择好日期之后，input的那个空给你显示出你选择的日期
        // dateREF是个react.createREF()， 所以它的参数和功能都有react提供
       this.dateRef.current.value = startAt + ' to ' + endAt;

        this.setState({
            proposedBooking:{
                //这么做的原因是保持和constructor里面的state的初始设定保持对应
                ...this.state.proposedBooking,
                startAt,
                endAt
            }

        });
        // debugger;
        // console.log(this.state);
    }


//////////////////////guests/////////////////////
// 在render中，使用这个function的时候，由于仍人要在contractor里面BIND 一下this，但是我们这次稍微改写一下
    // 这里就是react的 ONCHANGE的应用，见笔记
    // 10进制
    selectGuests(event){
       // debugger;
       this.setState({
          proposedBooking: {
              ...this.state.proposedBooking,
              guests: parseInt(event.target.value, 10)
          }

       })

    }


//////////////////////booking modal 显示订房间的信息表单/////////////////////
// 这个就是一个setup and update state（你input的date， guest等等）。为了给booking MODAL 页面传入参数
// 我们用console log test一下就可以了。

    //当我们点击reserve book now这个button的时候，我们要让这个popup出现，所以我们把open设为true，就是打开
    // 对应 open， 然后就是把当前的calendar信息传给modal，user 确定要预约，我们要让user 看到更多的细节，before 他点confirm
     confirmProposedData() {
        const {startAt, endAt} = this.state.proposedBooking;
         const days = getRangeOfDates(startAt, endAt).length - 1;
         const {rental} = this.props;

        this.setState({
            proposedBooking: {
                ...this.state.proposedBooking,
                days,
                totalPrice: days * rental.dailyRate,
                rental
            },

            modal:{
                open: true
            }
        });
       // console.log(this.state);
     }


     // 对应close， 关闭modal这个popup window
    cancelConfirmation() {
        this.setState({
            modal: {
                open: false
            }
        })
     }

/////////////////////reserve action/////////////////////////////
    //这个和actions中的index有关, 当我点击了reserve button，相当于我create一个action
    // errors 是 从server返回来的error，例如，同一个user不能book自己的rental等等。

    //当我们点modal页面的confirm的时候，我们就做两件事情，一是更新数据库（这个由actions的AXIOS来做），把新的time加入array之后
    // 然后我们一定要再把它disable掉这就是为什么我们call newbookedoutdate，之后就可以close modal了。
    // 二，我们要close modal window，call cancel function


   reserveRental() {
       actions.createBooking(this.state.proposedBooking)
           .then(
               (booking) =>{
                   //debugger;
                   this.addNewBookedOutDates(booking);
                   this.cancelConfirmation();
                    this.resetData();
                    toast.success('Booking has been succesfuly created!');
               },
               (errors) =>{
                   //debugger;
                   this.setState({errors});

               }
           )
    }

   addNewBookedOutDates(booking) {
        const dateRange = getRangeOfDates(booking.startAt, booking.endAt);
        this.bookedOutDates.push(...dateRange);
   }

    //清空之前填的空
    resetData() {
        this.dateRef.current.value = '';

        this.setState({proposedBooking: {guests: ''}});
    }

//////////////////////render/////////////////////

    render() {
        const {rental} = this.props;

        //当我们没有提供它们三中的任何一样，button都不可以被click
        const {startAt, endAt, guests} = this.state.proposedBooking;

        //为什么要把toast container放在这个位置？自己test的结果是放在哪里都没关系。。。
        return (
            <div className='booking'>
                <ToastContainer />
                <h3 className='booking-price'>$ {rental.dailyRate} <span className='booking-per-night'>per night</span></h3>
                <hr></hr>
                <div className='form-group'>
                    <label htmlFor='dates'>Dates</label>
                    <DateRangePicker onApply={this.handleApply}
                                     isInvalidDate={this.checkInvalidDates}
                                     opens='left'
                                     containerStyles={{display: 'block'}}>
                        <input ref={this.dateRef}
                               id='dates'
                               type='text'
                               className='form-control'></input>
                    </DateRangePicker>
                </div>
                <div className='form-group'>
                    <label htmlFor='guests'>Guests</label>
                    <input onChange={(event) => {this.selectGuests(event)}}
                           value={guests}
                           type='number'
                           className='form-control'
                           id='guests'
                           aria-describedby='guests'
                           placeholder=''></input>
                </div>
                <button disabled={!startAt || !endAt || !guests}
                        onClick={() => this.confirmProposedData()}
                        className='btn btn-bwm btn-confirm btn-block'>Reserve place now</button>
                <hr></hr>
                <p className='booking-note-title'>People are interested into this house</p>
                <p className='booking-note-text'>
                    More than 500 people checked this rental in last month.
                </p>

                {/*//显示bookingmodal，把参数传给它。booking就是你在各个function中update的proposeBooking中设置的参数*/}
                <BookingModal open={this.state.modal.open}
                              closeModel={this.cancelConfirmation}
                              confirmModal ={this.reserveRental}
                              booking={this.state.proposedBooking}
                              rentalPrice={rental.dailyRate}
                              errors={this.state.errors}
                />



            </div>
        )
    }


}


