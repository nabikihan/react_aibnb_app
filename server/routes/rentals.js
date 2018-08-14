const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');

// show 所有的data， rentallist
router.get('', function(req, res){
   //由于find的对象为空，这个的意思就是你将会look up all the files inside our database
   // 如果没找到就是error，如果找到了就显示结果。用postman test之后，发现data会 show出来
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