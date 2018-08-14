const express = require('express');

// 你现在把express所有的功能都assign给了这个APP 变量；
// 你肯定是要receive http request，这样你需要让app能够listen，并且assign一个端口给它。
const app = express();


///////////database////////////
const mongoose = require('mongoose');
const config = require('./config/prod');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

//我们在connect了mongoDB的link之后还可以继续进行操作，那就是直接call THEN, 在then里面我们写callback function，
//then规定有两个input 情况1 情况2。 如果情况1不OK, 我们进行情况2。 本次我们知道情况1一定OK, 所以可以不写，就一种情况所以不用写
// 我们用SEEDDB去call pushdata TO DB
mongoose.connect(config.DB_URI,{ useNewUrlParser: true }).then(() => {
    const fakeDB = new FakeDb();
    fakeDB.seedDb();
});

///////////////route////////////////////////
const rentalRoutes = require('./routes/rentals');

// middleware??? 目前你只需要知道，我们要去rentalroutes，然后我们去API这个route
//如果你run postman，你会发现你PUT这个link：http://localhost:3001/api/v1/rentals， send之后的结果就是rentalroutes中的PAIR
// 因为你的rentalroutes的路径是''， 所以它去这个主路径之后，直接就给出了结果。
app.use('/api/v1/rentals', rentalRoutes);

// server也需要识别路径，我们需要get route, 之后我们会用一个CALLBACK function去得到data，然后返回给app
//这里的写法是，JSON是个object，所以我们要用{},里面是个KEY VALUE PAIR, 然后用postman来检测
// 但是当我们的routing很复杂的时候，我们单独建立一个文件来写，见上面的部分
// app.get('/rentals', function(req, res){
//   res.json({'sucess': true});
// });


const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('app is running');
});