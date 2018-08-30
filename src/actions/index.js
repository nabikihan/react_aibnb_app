import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT,
    FETCH_RENTALS_INIT,
    FETCH_RENTALS_FAIL
} from "./types";
import axios from 'axios';
import authService from '../services/auth-service';
import axiosService from '../services/axios-service';


////STEP 4////

//////////////////////////////////axios service////////////////////////////////////
//我们import的是一个object， 然后我们调用里面的function。
// 然后我们就可以改写有AXIOS关键字的function。
// 注意，因为我们在AXIOSservice中，把API/V1设为了baseURL, 所以设及到的链接都有baseURL替代。
const axiosInstance = axiosService.getInstance();





///////////////actions， 服务器的推送或者用户的操作之类的/////////////
//本次的例子中的actions为 得到rentals数据。


const fetchRentalByIdInit = () => {
  return {
      type: FETCH_RENTAL_BY_ID_INIT
  }
}

const fetchRentalByIdSuccess = (rental) => {
    return{
        type: FETCH_RENTAL_BY_ID_SUCCESS,

        //rental:rental KEY和value都一样，简写为一个
        rental
    }

};

// 如果成功则直接返回，不用写error
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
// actions are objects, so you need to return objects from a function.
//这种ARROW function的写法就是把object和得到它的function直接相连， 很灵活。
// type is necessary for actions
// rentals这个参数是怎么规定的呢， 见redux的action模版

const fetchRentalsSuccess = (rentals) =>{
    return {
        type: FETCH_RENTALS_SUCCESS,
        rentals
    }

};


// 有了query parameter之后，我们可以把city作为input输入进去
export const fetchRentals = (city) => {

    const url = city ? `/rentals?city=${city}` : '/rentals';

    //这个code很明显，AXIOS先把这个get rentals 的request send给link TO server，然后（then）拿到server的数据之后(也就是RENTALS对应的rentallist的数据)，
    // 开始dispatch the action（rentallist数据） TO reducer,
    // 注意，这里把dispatch的必须是data 而不是object,你run一下debugger，你会发现，如果你不写data，它返回的是一个抽象的object，而
    // rental list的数据在这个object里面的data中。

    // API/V1/~这个路径是server规定的，在SERVER-INDEX文件中，因为你要send request TO server，所以这里input 为server的路径。
    // 这里我们用了proxy，见package JSON里面的proxy的设置（规定了server的route等等），因为它默认你是从origin link send request，所以我们把 HTTP://LOCALHOST:3000省略，直接写API～就好。
    // return dispatch => {
    //     axios.get('/api/v1/rentals')
    //           .then((rentals) => {
    //               dispatch(fetchRentalsSuccess(rentals.data));
    //     });
    // };


// 我们improve it, 因为我们直接返回了DATA , 所以我们不需要再写RENTALS.DATA了。因为我们已经在send data了。
//     return dispatch => {
//         axios.get('/api/v1/rentals')
//               .then((res) => res.data)
//               .then(rentals =>
//                   dispatch(fetchRentalsSuccess(rentals))
//               );
//     };

//在使用了AXIOS INTERCEPTOR之后
    return dispatch => {
        //每次我们send city searching request的时候，我们都要reset data，清空
        dispatch(fetchRentalsInit());

        axiosInstance.get(url)
            .then((res) => res.data)
            .then(rentals => dispatch(fetchRentalsSuccess(rentals)))
            .catch(({response}) => dispatch(fetchRentalsFail(response.data.errors)))

    };

};

////////////////rental detail with async////////////////////////////
export const fetchRentalById = (rentalId) => {

    // this function will delay dispatch
    return function (dispatch) {

        //我们先call dispatch，可以解决: 每次点击新的rentalcard的时候都会先LOAD上一次的card页面，然后过了1秒才会变成新的card
        dispatch(fetchRentalByIdInit());


        //这个code很明显，AXIOS先把这个get rentalID 的request send给link TO server，然后（then）拿到server的数据之后(也就是RENTALID对应的rental的数据)，
        // 开始dispatch the action（rental数据） TO reducer

        // axios.get(`/api/v1/rentals/${rentalId}`)
        //      .then((rental) => {
        //          dispatch(fetchRentalByIdSuccess(rental.data));
        //      });

        axios.get(`/api/v1/rentals/${rentalId}`)
            .then((res) => res.data)
            .then(rental =>
                dispatch(fetchRentalByIdSuccess(rental))
            );


//有了AXIOS之后，不需要async settimeout了。因为AXIOS会先把action send给server， 然后等server传给它data，之后在传给action去 dispatch
        // send request to server, async task
        // 在1秒之后， 开始match ID，然后dispatch
        // setTimeout(() => {
        // // iterate rental array, the two ids must be exactly the same,
        // // they both should be string, etc
        //     const rental = rentals.find((rental) => rental.id === rentalId);
        //     dispatch(fetchRentalByIdSuccess(rental));
        // }, 1000);

    }
}

/////////////////////auth/register/login actions////////////////////////////////////
// 把整个的userdata（whatever YOUR INPUT IS）传个route，也就是给server，根据server register的code
//如果成功，则response是response，否则为error
//我们不用写成{...USERDATA} 因为USERDATA 和之前没关系，这个是新的，newly created

export const register = (userData) => {
    return axios.post('/api/v1/users/register', userData)
                .then(
                    res => res.data,

                    err => Promise.reject(err.response.data.errors)
                    // 这里我们必须用promise.reject， 因为当server返回一个error给我们的时候， 如果你这里不写promise，这样写：
                      //return err.response.data.errors;
                      //那么actions会把这个结果作为response返回给register，register就认为这是个成功的response。

                    )
}

// token is response that we are getting from the server, 如果成功的就是JWT的加密信息。
// 我们不再需要token，因为如果login SUCCESS之后，就可以直接把token存入local storage了，不需要这里写
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

    //我们想server发送请求，login信息在user data中，如果验证OK, 则拿到server返回给我们的token，把它以KEY value 的形式存储在localstorage中
    // 如果fail了，我们要catch EXCP,返回server response中的error
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

////////////////////////////booking////////////////////////////////////
// 这里我们也要用AXIOS INTERCEPTOR来截取JWT
export const createBooking = (booking) => {
    return axiosInstance.post('/bookings', booking)
        .then(res => res.data)
        .catch(({response}) => Promise.reject(response.data.errors))
    //同理，这里如果你不写reject，虽然你返回一个error，但是在booking的reserve那个function里面，
    // 这个error会被认为是success的结果，会被作为response分配给booking
};


////////////////////////////CREATE RENTALS////////////////////////////////////

export const createRental = (rentalData) => {
    return axiosInstance.post('/rentals', rentalData).then(
        res => res.data,
        err => Promise.reject(err.response.data.errors)
    )
}



