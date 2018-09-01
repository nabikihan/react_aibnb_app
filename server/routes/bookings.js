const express = require('express');
const router = express.Router();
const BookingCtrl = require('../controllers/booking');
const UserCtrl = require('../controllers/user');


//我们把 里面的callbackfunction 用 controller写

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);


//////////////////////////////////manage book/////////////////////////////////////////////
//其实这里的BookingCtrl.getUserBookings和rental manage写法一样，但是我们把它写在bookingCTRL文件里

router.get('/manage', UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;