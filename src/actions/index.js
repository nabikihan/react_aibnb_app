import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_FAIL,

    FETCH_USER_BOOKINGS_SUCCESS,
    FETCH_USER_BOOKINGS_FAIL,
    FETCH_USER_BOOKINGS_INIT
} from "./types";
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';



//////////////////////////////////axios service////////////////////////////////////
const axiosInstance = axiosService.getInstance();

const fetchRentalByIdInit = () => {
  return {
      type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
    return{
        type: FETCH_RENTAL_BY_ID_SUCCESS,
        rental
    }

};

const fetchRentalsInit = () => {
    return {
        type: FETCH_RENTALS_INIT
    }
}

const fetchRentalsFail = (errors) => {
    return {
        type: FETCH_RENTALS_FAIL,
        errors
    }
}


/////////////////////rental list////////////////////////////////////
const fetchRentalsSuccess = (rentals) =>{
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }

};


export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';


    return dispatch => {
        dispatch(fetchRentalsInit());

        axiosInstance.get(url)
            .then((res) => res.data)
            .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
            .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))

    };

};

////////////////rental detail with async////////////////////////////
export const fetchRentalById = (rentalId) => {
    
    return function (dispatch) {

        dispatch(fetchRentalByIdInit());

        axios.get(`/api/v1/rentals/${rentalId}`)
            .then((res) => res.data)
            .then(rental =>
                dispatch(fetchRentalByIdSuccess(rental))
            );

    }
}

/////////////////////auth/register/login actions////////////////////////////////////
export const register = (userData) => {
    return axios.post('/api/v1/users/register', userData)
                .then(
                    res => res.data,

                    err => Promise.reject(err.response.data.errors)
           
                )
}

const loginSuccess = () => {

    const username = authService.getUsername();
    return {
        type: LOGIN_SUCCESS,
        username
    }
}

const loginFailure = (errors) => {
    return {
        type: LOGIN_FAILURE,
        errors
    }
}


//// check auth state to see if the login information/token is already exist
export const checkAuthState = () => {
    //debugger;

    return dispatch => {
        if (authService.isAuthenticated()){
            dispatch(loginSuccess());
        }
    }
}

export const login = (userData) => {

    return dispatch => {
        return axios.post('/api/v1/users/auth', userData)
            .then(res => res.data)
            .then(token => {
                //debugger;
                authService.saveToken(token);
                dispatch(loginSuccess());
            })
            .catch(({response}) => {
               // debugger;
                dispatch(loginFailure(response.data.errors));
            })
    }
}

//////////////////////////////////logout actions////////////////////////////////////

export const logout = () => {

    authService.invalidateUser();
    return {
        type: LOGOUT
    }
};

////////////////////////////booking rentals////////////////////////////////////
export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
};


////////////////////////////CREATE RENTALS////////////////////////////////////
export const createRental = (rentalData) => {
    return axiosInstance.post('/rentals', rentalData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
};


////////////////////////////USER manage////////////////////////////////////
export const getUserRentals = () => {
    return axiosInstance.get('/rentals/manage').then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}

export const deleteRental = (rentalId) => {
    return axiosInstance.delete(`/rentals/${rentalId}`).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors))
}

////////////////////////////BOOKINGS manage////////////////////////////////////
const fetchUserBookingsInit = () => {
    return {
        type: FETCH_USER_BOOKINGS_INIT
    }
}

const fetchUserBookingsSuccess = (userBookings) => {
    return {
        type: FETCH_USER_BOOKINGS_SUCCESS,
        userBookings
    }
}

const fetchUserBookingsFail = (errors) => {
    return {
        type: FETCH_USER_BOOKINGS_FAIL,
        errors
    }
}

export const fetchUserBookings = () => {
    return dispatch => {
        dispatch(fetchUserBookingsInit());

        axiosInstance.get('/bookings/manage')
            .then(res => res.data )
            .then(userBookings => dispatch(fetchUserBookingsSuccess(userBookings)))
            .catch(({response}) => dispatch(fetchUserBookingsFail(response.data.errors)))
    }
}
