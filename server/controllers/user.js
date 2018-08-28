const User = require('../models/users');
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/prod');

//////////////////////////////////////////接route中的user， 写////callback function///////////////////////////////////////
//////////////////////////////////////////login///////////////////////////////////////////////////////////////
//.auth is the name of this handler， 这个callback function是来自于routes user的。
exports.auth = function(req, res){

    //我们要先从bodyparse这个middleware中取出我们的input。
    const {email, password} = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }

    User.findOne({email}, function(err, user) {
        if (err) {
           return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (!user) {
            return res.status(422).send({errors:[{title: 'Invalid User', detail: 'User does not exist!'}]});
        }

        if (user.hasSamePassword(password)) {
      ///////////////////// return jwt token /////////////////////
            //格式为： data(payload,token的内容，识别功能)， secret（一个识别功能的，decode的时候要用到同样的string） expiration
            //第一个部分叫issuer表明请求的实体，可以是发出请求的用户的信息。
            // exp是expires的简写，是用来指定token的生命周期。
            const token = jwt.sign(
                {userId: user.id,
                username: user.username},
                 config.SECRET,
                {expiresIn: '1h'});

            return res.json(token);

        } else {
            return res.status(422).send({errors: [{title: 'Wrong Data!', detail: 'Wrong email or password!'}]});
        }

    });
};


//////////////////////////////////////////register///////////////////////////////////////////////////////////////
// body就是body parser middleWARE

//当我们create一个新的user的时候，会自动加到DB中？？
exports.register = function(req, res){
    // const username = req.body.username;
    // const email = req.body.email;
    // const password = req.body.password;
    // const passwordConfirmation = req.body.passwordConfirmation;


    const {username, email, password, passwordConfirmation} = req.body;

    if (!password || !email) {
        return res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password!'}]});
    }

    if (password !== passwordConfirmation) {
        return res.status(422).send({errors: [{title: 'Invalid password', detail: 'Password is not as same as confirmation!'}]});
    }

    User.findOne({email}, function(err, existingUser){
        if(err){
            return res.status(422).send({errors: normalizeErrors(err.errors)});
        }

        if (existingUser) {
            return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email is already existed!'}]});
        }

        // because key is same as value, so we only need one word
        // User is from mongodb, you are creating a new mongodb data
        const user = new User({
            username,
            email,
            password
        });



//如何handling mongoose errors：我们在helpers中建立一个页面，里面是具体的方法，然后import它，
// err.errors,ERR为input object， errors为mongoDB 的格式中的一个部分，例如rental的格式为"ID"，"name"之类的，ERROR的格式为"errors"，"message"等
        //这里的errors实际上是根据你之前的各种条件来输出的，error无非就是email格式不对，username已经存在等等。
        user.save(function(err) {
            if(err) {
               return res.status(422).send({errors: normalizeErrors(err.errors)});
            }

            return res.json({'registered':true});
        });

    });

    // 把username和email show出来
   // res.json({username, email});

};

//////////////////////////////////////////AUTH middleware，解密token///////////////////////////////////////////////////////////////

//过程为：先decode token，然后通过tokeN中的userID开始核对，如果出错，则；如果是这个user，则把database的数据给当前user（express模版，无需质疑），
//如果没有这个user，则需要登陆；
// 去ROUTE-RENTAL页面，简单写个函数验证解密结果

exports.authMiddleware = function(req, res, next){
    const token = req.headers.authorization;

    if (token) {
         const user = parseToken(token);
         User.findById(user.userId, function(err, user){
             if(err) {
                 return res.status(422).send({errors: normalizeErrors(err.errors)});
             }
             if(user) {
                res.locals.user = user;
                next();
             } else {
                 return notAuthorized(res);
             }
         });
    } else {
        return notAuthorized(res);
   }
};

function parseToken(token) {
    //'Bearer sdgeotgowur3wejw7923889ieht3495',这个是authorization的形式，第二部分是token，第一部分是authorization header

   return jwt.verify(token.split(' ')[1], config.SECRET);
}

function notAuthorized(res){
    return res.status(401).send({errors: [{title: 'Not authorized',detail: 'You need to login to access'}]});
}