import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_FAIL
} from "../actions/types";
///////////////////reducer，作用是SWITCH STATE/////////////
//对于本次例子，就是由空array，变成rental array
// 加error的参数是因为 fetch rentals fail.

const INITIAL_STATE ={
    rentals: {
        data: [],
        errors: []
    },

    // 单独的元素，是个对象，因此用大括号
    rental:{
        data:{}
    }
}

////STEP 2////
////STEP 3 是页面的componentwillmount中的dispatch action
/////////////////////rental list///////////////////////////////////
// ...state means previous state
export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {

    switch(action.type) {

        case FETCH_RENTALS_INIT:
            return {...state, data:[], errors: []};

        case FETCH_RENTALS_SUCCESS:
            return {...state, data: action.rentals};

        case FETCH_RENTALS_FAIL:
            return Object.assign({}, state, {errors: action.errors, data: []} );
        default:
         return state;
    }
}

///////////////////rental detail with async//////////////////////////////////
export const selectedRentalReducer = (state = INITIAL_STATE.rental, action) => {
    switch (action.type) {

        case FETCH_RENTAL_BY_ID_INIT:
            return {...state, data: {}};

        case FETCH_RENTAL_BY_ID_SUCCESS:
            //return Object.assign({}, state, {data: action.rental});
            return{...state, data: action.rental};

        default:
            return state;
    }
}