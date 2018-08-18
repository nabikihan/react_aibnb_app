const express = require('express');
const User = require('../controllers/user');
const router = express.Router();


//我们把 里面的callbackfunction 用 controller写，user.auth实际上就是controller中的callback function。
// router.post('/auth', function(req, res){});

router.post('/auth', User.auth);


router.post('/register', User.register);

module.exports = router;