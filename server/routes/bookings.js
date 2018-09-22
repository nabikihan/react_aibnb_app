const express = require('express');
const router = express.Router();
const BookingCtrl = require('../controllers/booking');
const UserCtrl = require('../controllers/user');


router.post('', UserCtrl.authMiddleware, BookingCtrl.createBooking);

//////////////////////////////////manage book/////////////////////////////////////////////
router.get('/manage', UserCtrl.authMiddleware, BookingCtrl.getUserBookings);

module.exports = router;