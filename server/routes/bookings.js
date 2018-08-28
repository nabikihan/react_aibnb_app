const express = require('express');
const router = express.Router();
const BookingCtrl = require('../controllers/booking');
const UserCtrl = require('../controllers/user');


//我们把 里面的callbackfunction 用 controller写

router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);


//router.post('/manage', BookingCtrl.getUserBookings);

module.exports = router;