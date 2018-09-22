import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


import {rentalReducer, selectedRentalReducer} from "./rental-reducer";
import {authReducer} from "./auth-reducer";
import { userBookingsReducer } from './booking-reducer';

import {reducer as formReducer} from 'redux-form';

/////////////////////store/////////////////////
export const init = () => {
    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer,
        form: formReducer,
        auth: authReducer,
        userBookings: userBookingsReducer
    });

    //这个的意思就是check进程，如果当前action没有变，则返回compose，也就是原来的state， 如果确实出现了进程的改变（也就是你的action，或者store中的数据变化了）
    //则 更新state，返回新的state。
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}