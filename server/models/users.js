const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// email require必须写, email match是正则表达式，它会validate我们email的格式。
// rentals ：each user should have multiple rentals data, 所以我们用了一个array，对比data model， 我们只用rentalID 作为参数，传给user,
const userSchema = new Schema({
    username: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters']
    },
    email: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        unique: true,
        lowercase: true,
        required: 'Email is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/]
    },
    password: {
        type: String,
        min: [4, 'Too short, min is 4 characters'],
        max: [32, 'Too long, max is 32 characters'],
        required:'Password is required'
    },
    rentals: [{type: Schema.Types.ObjectId, ref: 'Rental'}],
    bookings: [{type: Schema.Types.ObjectId, ref: 'Booking'}]
});

/////////////////////compare password for controller - users-login function /////////////////////
//.methods的意思就是你可以接下来create你自己的methods
// this.password is the one from mongodb, requestedpassword is the one I post
userSchema.methods.hasSamePassword = function(requestedPassword){
    return bcrypt.compareSync(requestedPassword, this.password);
};

//////////////////////////////encrypt password before saving to db/////////////////////////////////
userSchema.pre('save', function(next){

    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            // Store hash in your password DB.
            user.password = hash;
            // then call next function in the queue , so the next function就是把user save到DB中
            //也就是说，call controller中的USER.SAVE()。
            next();
        });
    });
});

module.exports = mongoose.model('User', userSchema );