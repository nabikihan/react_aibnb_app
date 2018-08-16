import {
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT,
    FETCH_RENTALS_SUCCESS
} from "./types";
import axios from 'axios';

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

export const fetchRentals = () => {

    //这个code很明显，AXIOS先把这个get rentals 的request send给link TO server，然后（then）拿到server的数据之后(也就是RENTALS对应的rentallist的数据)，
    // 开始dispatch the action（rentallist数据） TO reducer,
    // 注意，这里把dispatch的必须是data 而不是object,你run一下debugger，你会发现，如果你不写data，它返回的是一个抽象的object，而
    // rental list的数据在这个object里面的data中。


    // 这里我们用了proxy，见package JSON里面的proxy的设置，因为它默认你是从origin link send request，所以我们把 HTTP://LOCALHOST:3000省略，直接写API～就好。
    // return dispatch => {
    //     axios.get('/api/v1/rentals')
    //           .then((rentals) => {
    //               dispatch(fetchRentalsSuccess(rentals.data));
    //     });
    // };


// 我们improve it, 因为我们直接返回了DATA , 所以我们不需要再写RENTALS.DATA了。因为我们已经在send data了。
    return dispatch => {
        axios.get('/api/v1/rentals')
              .then((res) => res.data)
              .then(rentals =>
                  dispatch(fetchRentalsSuccess(rentals))
              );
    };

};

////////////////rental detail with async////////////////////////////
export const fetchRentalById = (rentalId) => {

    // this function will delay dispatch
    return function(dispatch) {

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

