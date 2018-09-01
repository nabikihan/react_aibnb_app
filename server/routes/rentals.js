const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/users');
const {normalizeErrors} = require('../helpers/mongoose');

/////////////////////////////////////test token//////////////////////////////////////////
const UserCtrl = require('../controllers/user');

//secret的意思就是，当你在actions index中用了AXIOSinterceptor后，你就可以protect你的user了。如果你把路径改为
// 原路径+secret，如下，那么你login的时候 也不会show出对应的页面，你logout的时候更不会，server会给出相应的原因。
router.get('/secret', UserCtrl.authMiddleware,function(req, res){
         res.json({"secret": true});
});



///////////////////////////////////endpoint，MANAGE rental////////////////////////////////////////////
//注意这个function必须写在.GET(ID)的前面，因为如果你写在GETID的后面，先run GET ID , 由于你写的manage路径正好符合GET ID 的route格式，
//但是manage这个词明显不是rentalID，所以 GET ID 这个函数会报错。你的程序就不会往下run了。

router.get('/manage',  UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  // 该user是从request里面得到的。
  // 关于为啥是found rentals，你的这个router就是为了展示rentals。
  Rental
    .where({user})
    .populate('bookings')
    .exec(function(err, foundRentals) {

        if (err) {
          return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        return res.json(foundRentals);
  });
});


///////////////////////////////////rentalID routes//////////////////////////////////////////////

//这个是show 单独的data，即每一个rental的data，你要refresh你的MLAB ，然后把某个rental的IDcopy出来，
//paste到路径后面就可以看到这个rental的data了。
router.get('/:id', function(req, res){
   const rentalId = req.params.id;

   /////////////////////// 我们加了booking之后，我们要把ID和booking都show出来
   // populate rental by user data and booking data, 第二个ARGU就是restriction，我希望send给我什么，不希望send给我什么（-XX, 减号）
       Rental.findById(rentalId)
             .populate('user', 'username _id')
             .populate('bookings', 'startAt endAt -_id')
             .exec(function(err, foundRental){
                  if (err) {
                      return res.status(422)
                                .send({errors: [{title: 'Rental Error', data: 'Could not find Rental'}]})
                   }
                  return res.json(foundRental);

             });

});

///////////////////////////////////rentallisting routes//////////////////////////////////////////////
router.get('', function(req, res){

       //query para
      // to lower case就是whatever 你在route上写什么，它都会变成小写，因为我们的DB要求全部小写。
       const city = req.query.city;
       const query = city ? {city: city.toLowerCase()} : {};


       //由于find的对象为空，这个的意思就是你将会look up all the files inside our database
       // 如果没找到就是error，如果找到了就显示结果。用postman test之后，发现data会 show出来
       //其中 foundRentals的名称并不重要，它只是 callback function的一个名称， 你叫A 也一样work， 它就是一个参数，
       //它的作用就是承载find{}返回的数据，用.JSON显示出来。你看 router.GET中明显的对应写好了它是RES
       //这里我们也要选择性的写一下，加了booking之后，rentallisting page会把booking所有信息也显示，太多了，所以我们不希望展示B
       // Rental.find()
                   // .select('-bookings')
                   // .exec(function(err, foundRentals){
                   //      return res.json(foundRentals);
                   // });


       // 有了query parameter之后，我们要改写
       Rental.find(query)
             .select('-bookings')
             .exec(function(err, filteredRentals){
                  if (err) {
                      return res.status(422).send({errors: normalizeErrors(err.errors)});
                  }


                  if (city && filteredRentals.length === 0) {
                      return res.status(422).send({errors: [{title: 'No Rentals Found!', detail: `There are no rentals for city ${city}`}]});
                  }

                return res.json(filteredRentals);
             });


});

///////////////////////////////////endpoint， create NEW rental////////////////////////////////////////////
//为啥这里需要middleWAR？因为我们要authorized这个动作
router.post('', UserCtrl.authMiddleware, function(req, res) {
  const { title, city, street, category, image, shared, bedrooms, description, dailyRate } = req.body;
  const user = res.locals.user;

  const rental = new Rental({title, city, street, category, image, shared, bedrooms, description, dailyRate});
  rental.user = user;

  Rental.create(rental, function(err, newRental) {
    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

   // ？？？这里我们还要遍历function，因为我们要更新 user
    User.update({_id: user.id}, { $push: {rentals: newRental}}, function(){});

    return res.json(newRental);
  });
});



///////////////////////////////////endpoint， DELETE rental////////////////////////////////////////////
//为啥这里需要middleWAR？因为我们要authorized这个delete
// 这里的populate比较复杂，首先我们要关联user的ID，同时还要关联booking的startAT 时间，match就是比较关联的
// startAT 和当前的时间（ new data（））， 要令booking的开始时间大于当前时间（即这个book的时间是valid的， 如果
//这些都满足，说明这个active的book，则

router.delete('/:id', UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental
    .findById(req.params.id)
    .populate('user', '_id')
    .populate({
      path: 'bookings',
      select: 'startAt',
      match: { startAt: { $gt: new Date()}}
    })
    .exec(function(err, foundRental) {

    if (err) {
      return res.status(422).send({errors: normalizeErrors(err.errors)});
    }

    if (user.id !== foundRental.user.id) {
      return res.status(422).send({errors: [{title: 'Invalid User!', detail: 'You are not rental owner!'}]});
    }

    // book IS found with this rental
    if (foundRental.bookings.length > 0) {
      return res.status(422).send({errors: [{title: 'Active Bookings!', detail: 'Cannot delete rental with active bookings!'}]});
    }


    //如果即是当前user，而它的book不是active，则可以删除，删除之后如果返回database出问题则返回error，如果一切顺利，则返回一个JSON说明结果
    foundRental.remove(function(err) {
      if (err) {
        return res.status(422).send({errors: normalizeErrors(err.errors)});
      }

      return res.json({'status': 'deleted'});
    });
  });
});




module.exports = router;