import titleize from 'titleize'
import * as moment from 'moment';

//这个写法是个简写，应该是 ：
// const rentalType = (isShared) =>{ if (isShared) return xxx ...}, 如此可以见rental type是有argument的，为isshared这个boolean。
export const rentalType = isShared => isShared ? 'shared' : 'entire';

export const toUpperCase = value => value? titleize(value) : '';



/////////////////////////////////////booking-calendar////////////////////////////////
// import moment and put it on top
// dateformat就是YYMMDD 这种已经规定好了的
//整个这段code的设计就是，我们从database中得到booking的开始和结束，然后我们遍历每一个开始，只要满足它小于结束，就push到tempdate中，然后开始++
// 以此就可以把这个daterange都push到tempDate中。

export const getRangeOfDates = (startAt, endAt, dateFormat = 'Y/MM/DD') => {
    const tempDates = [];
    const mEndAt = moment(endAt);
    let mStartAt = moment(startAt);

    while (mStartAt < mEndAt) {
        tempDates.push(mStartAt.format(dateFormat));
        mStartAt = mStartAt.add(1, 'day');
    }
    tempDates.push(mEndAt.format(dateFormat));

    return tempDates;
}

