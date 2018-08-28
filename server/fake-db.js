const Rental = require('./models/rental');
const User = require('./models/users');
const Booking = require('./models/booking');

const fakeDbData = require('./data.json');

class FakeDb {

    constructor() {
        this.rentals = fakeDbData.rentals;
        this.users = fakeDbData.users;

    }


//////////////为了防止data多的时候，push重复的data///////////////

    async cleanDb() {
        await User.remove({});
        await Rental.remove({});
        await Booking.remove({});
    }

//////////////////push我们的dataTO database////////////////////
    pushDataToDb() {
        const user = new User(this.users[0]);
        const user2 = new User(this.users[1]);

      //iteratate the rental data， 并且把每一个rental都加上第一个user，不能一个rental对应两个user
        this.rentals.forEach((rental) => {
            const newRental = new Rental(rental);
            newRental.user = user;

            user.rentals.push(newRental);
            newRental.save();

        });
        user.save();
        user2.save();

    }

    // 为了防止加入重复的data，我们最好先clear database，然后再加入，问题来了，我们没法控制它们的时间，如果cleanDB耗费的时间
    //比pushDB长，那这个结果就是先pushDB ,然后再clear ，最后我们database中为空。
    //所以我们这里必须建立一个async的function，让cleanDB先run。
    //我们用AWAIT ,这个的意思就是等着cleanDB, 所有的操作必须等cleanDB结束之后，才可以运行

    async seedDb() {
        await this.cleanDb();
        this.pushDataToDb();
    }

    // seedDb() {
    //     this.cleanDb();
    //     this.pushDataToDb();
    // }
}

// export the class
module.exports = FakeDb;