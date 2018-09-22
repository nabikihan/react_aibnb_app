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


if (process.env.NODE_ENV === 'production') {
    const appPath = path.join(__dirname, '..', 'build');
    app.use(express.static(appPath));

    app.get('*', function(req, res) {
        res.sendFile(path.resolve(appPath, 'index.html'));
    });
}
