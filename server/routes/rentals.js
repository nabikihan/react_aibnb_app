const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

/////////////////////////////////////test token//////////////////////////////////////////
const UserCtrl = require('../controllers/user');

//secret的意思就是，当你在actions index中用了AXIOSinterceptor后，你就可以protect你的user了。如果你把路径改为
// 原路径+secret，如下，那么你login的时候 也不会show出对应的页面，你logout的时候更不会，server会给出相应的原因。
router.get('/secret', UserCtrl.authMiddleware,function(req, res){
         res.json({"secret": true});
});


///////////////////////////////////rental routes//////////////////////////////////////////////
// show 所有的data， rentallist
router.get('', function(req, res){
   //由于find的对象为空，这个的意思就是你将会look up all the files inside our database
   // 如果没找到就是error，如果找到了就显示结果。用postman test之后，发现data会 show出来
   //其中 foundRentals的名称并不重要，它只是 callback function的一个名称， 你叫A 也一样work， 它就是一个参数，
   //它的作用就是承载find{}返回的数据，用.JSON显示出来。你看 router.GET中明显的对应写好了它是RES

   Rental.find({}, function(err, foundRentals) {
         res.json(foundRentals);
   });

});

//这个是show 单独的data，即每一个rental的data，你要refresh你的MLAB ，然后把某个rental的IDcopy出来，
//paste到路径后面就可以看到这个rental的data了。
router.get('/:id', function(req, res){
   const rentalId = req.params.id;
   Rental.findById(rentalId, function(err, foundRental){
      if (err) {
         res.status(422)
             .send({errors: [{title: 'Rental Error', data: 'Could not find Rental'}]})
      }
      res.json(foundRental);
   });
});

module.exports = router;