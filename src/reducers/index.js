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
<<<<<<< HEAD


    //这里你必须指明有个async task，调用THUNK来处理，因为如果你不写，它只会接受第一次的（没有delay1秒之前的）状态
    //你写了THUNK, 它才会知道，OK, 你一会还有一个state。这样就实现了async。
=======
>>>>>>> 2b515c4e84f3345538417ca3bd058f5a55b77d16
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}