const express = require('express');
const app = express();


///////////database////////////
const mongoose = require('mongoose');
const config = require('./config');
const Rental = require('./models/rental');
const FakeDb = require('./fake-db');

mongoose.connect(config.DB_URI, {useNewUrlParser: true}).then(() => {

    if (process.env.NODE_ENV !== 'production') {
         const fakeDb = new FakeDb();
        //fakeDb.seedDb();
    }

});


//////////////////////MIDDLEWARE: bodyparser////////////////////////
const bodyParser = require('body-parser');
app.use(bodyParser.json());



///////////////////////route////////////////////////
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users');
const bookingRoutes = require('./routes/bookings');

app.use('/api/v1/rentals', rentalRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/bookings', bookingRoutes);


///////////////////PORT/////////////////////////
const PORT = process.env.PORT || 3001;
app.listen(PORT, function(){
    console.log('app is running');
});


//////////////heroku/////////////////////////
const path = require('path');


<<<<<<< HEAD

    //dirname: 指server folder
    // ..: 去project目录下
    // build： 去build文件夹，BUILD里面含有所有的文件的build的东西，可以run server， run前端什么的。
    const appPath = path.join(__dirname, '..', 'build');

    //这个是个middleware for express server，可以让express知道我们这个static 文件在哪，
    // 所谓的static文件就是我们一些image， 一些code，那express就知道 文件在APPPATH中。就可以get them，server browser了。
    app.use(express.static(appPath));


    // response TO browser， TO client， 你看到我们用的是appPath, 'index.html'，也就是去build里面的INDEX.HTML中得到
    // 所有client信息。而build是集server， SRC之大成。

    // * ： every route
    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
=======
if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}
>>>>>>> 2b515c4e84f3345538417ca3bd058f5a55b77d16
