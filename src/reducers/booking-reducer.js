import  { FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    FETCH_USER_BOOKINGS_INIT } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    errors: [],
    isFetching: false
}


// 这里的actions是，actions index中 fetch userbookING 函数从server中取出来的data

// isFetching是我们在reducer book中设的一个参数，它就是表明我们在 fetching data from server
// INIT 是在我们sending request TO server之前发生的， 所以我们把它set为true。
// SUCCESS 是我们已经拿到了server的数据，我们不再 fetch data了， 所以我们把它set为false。
export const userBookingsReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_USER_BOOKINGS_INIT:
            return {...state, data: [], errors: [], isFetching: true};
        case FETCH_USER_BOOKINGS_SUCCESS:
            return {...state, data: action.userBookings, errors: [], isFetching: false};
        case FETCH_USER_BOOKINGS_FAIL:
            return {...state, errors: [], data: [], isFetching: false};
        default:
            return state;
    }
}