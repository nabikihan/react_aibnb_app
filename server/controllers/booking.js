const Booking = require('../models/booking');
const Rental = require('../models/rental');
const User = require('../models/users');
const {normalizeErrors} = require('../helpers/mongoose');
const moment = require('moment');

//这个REQ是啥？就是根据你的ROUTE 写的， 你要post，那么就需要你输入一些东西，输入的模版就是你在下面设置的参数，也就是REQ.BODY,
// 所以你在postman做test的时候，你要调到post模式中的body。 而RES应该是对应database给你返回的结果
exports.createBooking = function(req, res) {

    const {startAt, endAt, totalPrice, guests, days, rental} = req.body;

    //在controller-user 里面，我们用了这个，把当前RES数据中的user赋给一个variable user，这里我们也是用当前RES 中的user
    // 我们现在仅仅是在local memory中create booking， 还没有save IT TO DB .
   const user = res.locals.user;

   const booking = new Booking({startAt, endAt, totalPrice, guests, days});

   // each rental has a booking and rental, 如果你只是写findBYID ， 则你会得到一个rental，
    //但是without user 和 booking。而且我们还要check booking的一些信息，例如booking的date。我们还要check user，确定该user没有book了自己的rental
    // 这个findBYID 应该是数据库自带的功能。
   Rental.findById(rental._id)
         .populate('bookings')
         .populate('user')
         .exec(function(err, foundRental) {

             // 如果出现了 database方面的error ，则返回database的error
             if (err) {
                 return res.status(422).send({errors: normalizeErrors(err.errors)});
             }

             // user不能book自己的rental
             //这里的意思是，check 当前我们的user.ID 和从数据库找的rental中的ID 是否一样，如果一样则invalid
             if (foundRental.user.id === user.id) {
                 return res.status(422).send({
                     errors: [{
                         title: 'Invalid User!',
                         detail: 'Cannot create booking on your Rental!'
                     }]
                 });
             }

             // check booking is valid
             //这里的foundrental是.EXEC 的callback function返回的data。这里的意思就是显示出返回数据中的booking的部分，至于booking 是啥，
             //我们一开始就规定了。
             // return res.json({booking, foundRental})

             if (isValidBooking(booking, foundRental)) {

                 //我们也要update booking的user和rental，因为我们在schema中设立这两个参数。
                 //这个就是我们的local user，我们令新加的B 的user为当前user
                 booking.user = user;
                 booking.rental = foundRental;

                 // 我们每次create一个booking的时候，都要把这个  booking push到database，这样防止再加入同样的booking
                 foundRental.bookings.push(booking);

                 booking.save(function (err) {

                     if (err) {
                         return res.status(422).send({errors: normalizeErrors(err.errors)});
                     }
                     // 把新产生的B加入到当前rental中
                     foundRental.save();

                     //把新建的B 加入到当前user的B array里面， 用了mongo push
                     //???为啥这里还要写个callback function？？？
                     User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});

                     return res.json({startAt: booking.startAt, endAt: booking.endAt});
                 });

             } else {
                 return res.status(422).send({
                     errors: [{
                         title: 'Invalid Booking!',
                         detail: 'Choosen dates are already taken!'
                     }]
                 });
             }
         })

}




function isValidBooking(proposedBooking, rental) {
    let isValid = true;

    if (rental.bookings && rental.bookings.length > 0) {

        // .every的意思就是它会遍历你下面的每一次条件，match你的每一个rental和booking
        // 只有所有的结果都为true，它才返回true，有一个为false，则为false。


       isValid = rental.bookings.every(function(booking){

            //actualbooking 就是existing booking
           // 注意，我们设置的各种start date， END DATE 都是 string  不能直接比较，需要moment转一下
            const proposedStart = moment(proposedBooking.startAt);
            const proposedEnd = moment(proposedBooking.endAt);
            const actualStart = moment(booking.startAt);
            const actualEnd = moment(booking.endAt);

             return ((actualStart < proposedStart && actualEnd < proposedStart) ||
                (proposedEnd < actualEnd && proposedEnd < actualStart));

        });
    }
    return isValid;
}

/////////////////////////////manage booking///////////////////////////////////////////////////////////
//见 route-BOOKING.JS，和rental manage写法一样

exports.getUserBookings = function(req, res) {
    const user = res.locals.user;

    Booking
        .where({user})
        .populate('rental')
        .exec(function(err, foundBookings) {

            if (err) {
                return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json(foundBookings);
        });
};


