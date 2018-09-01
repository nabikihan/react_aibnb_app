import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';


import {rentalReducer, selectedRentalReducer} from "./rental-reducer";
import {authReducer} from "./auth-reducer";
import { userBookingsReducer } from './booking-reducer';

import {reducer as formReducer} from 'redux-form';

/////////////////////store/////////////////////

//redux basic 应用： 首先，在reducer folder下面的index.JS中initialize reducer，这个reducer会被用来switch state后拿到state，然后
// 把该state作为input存在store变量里，然后返回给app.js.
// 注意，INIT的返回值肯定是store，因为我们在APP.JS中还要用到这个更新的store。
// 然后，我们在rentalreducer中，把state（data数据）存入，并且用reducer的功能实现state的转换（旧的state-> 新的state）这个例子没有啥变化，所以只写个default
//并且返回state就好。
//再回到INIT, 通过调用rental-reducer中的转换state功能，我们更新了rentals。这三步就是reducer的应用过程。
// 对于 action的部分，我们看action folder里面的code

// form reducer是react的表单必须的， 是从REDUX form引入的，当你画好了表单页面，你发现并不能往空里面type东西，这时你必须import
// form reducer来update state，这样才可以type。


////STEP 1////
export const init = () => {
    const reducer = combineReducers({
        rentals: rentalReducer,
        rental: selectedRentalReducer,
        form: formReducer,
        auth: authReducer,
        userBookings: userBookingsReducer
    });

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    //这里你必须指明有个async task，调用THUNK来处理，因为如果你不写，它只会接受第一次的（没有delay1秒之前的）状态
    //你写了THUNK, 它才会知道，OK, 你一会还有一个state。这样就实现了async。
    const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
    return store;
}