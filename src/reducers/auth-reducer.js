import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/types';


// 我们其实不需要TOKEN, 因为如果login SUCCESS之后，就可以直接把token存入local storage了，不需要这里写。
const INITIAL_STATE = {
    isAuth: false,
    errors: [],
   // token: ''
}

export const authReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOGIN_SUCCESS:
            // .assgin({},xxx), 这个的意思就是create一个新的object， 然后把后面的state放进去。
           return Object.assign({}, state, {isAuth: true, errors: []});
        case LOGIN_FAILURE:
            return Object.assign({}, state, {errors: action.errors});
        case LOGOUT:
            return Object.assign({}, state, {isAuth: false});
        default:
            return state;
    }
}