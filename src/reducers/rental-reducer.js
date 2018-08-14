import {FETCH_RENTALS,
        FETCH_RENTAL_BY_ID_SUCCESS,
        FETCH_RENTAL_BY_ID_INIT} from "../actions/types";
///////////////////reducer，作用是SWITCH STATE/////////////
//对于本次例子，就是由空array，变成rental array

const INITIAL_STATE ={
    rentals: {
        data: []
    },

    // 单独的元素，是个对象，因此用大括号
    rental:{
        data:{}
    }
}

/////////////////////rental list///////////////////////////////////
// ...state means previous state
export const rentalReducer = (state = INITIAL_STATE.rentals, action) => {
   // debugger;
    switch(action.type) {
        case FETCH_RENTALS:
            return {...state, data: action.rentals};
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