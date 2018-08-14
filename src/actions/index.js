import {FETCH_RENTALS,
    FETCH_RENTAL_BY_ID_SUCCESS,
    FETCH_RENTAL_BY_ID_INIT} from "./types";

///////////////actions， 服务器的推送或者用户的操作之类的/////////////
//本次的例子中的actions为 得到rentals数据。

const rentals =  [{
        id: "1",
        title: "Central Apartment",
        city: "New York",
        street: "Times Sqaure",
        category: "apartment",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 3,
        description: "Very nice apartment",
        dailyRate: 34,
        shared: false,
        createdAt: "24/12/2017"
     },
    {
        id: "2",
        title: "Central Apartment 2",
        city: "San Francisco",
        street: "Main street",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 12,
        shared: true,
        createdAt: "24/12/2017"
    },
    {
        id: "3",
        title: "Central Apartment 3",
        city: "Bratislava",
        street: "Hlavna",
        category: "condo",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 2,
        description: "Very nice apartment",
        dailyRate: 334,
        shared: true,
        createdAt: "24/12/2017"
    },
    {
        id: "4",
        title: "Central Apartment 4",
        city: "Berlin",
        street: "Haupt strasse",
        category: "house",
        image: "http://via.placeholder.com/350x250",
        bedrooms: 9,
        description: "Very nice apartment",
        dailyRate: 33,
        shared: true,
        createdAt: "24/12/2017"
    }];

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

}


/////////////////////rental list////////////////////////////////////
// actions are objects, so you need to return objects from a function.
//这种ARROW function的写法就是把object和得到它的function直接相连， 很灵活。
// type is necessary for actions
// rentals这个参数是怎么规定的呢， 见redux的action模版
export const fetchRentals = () => {
    //debugger;
    return {
        type: FETCH_RENTALS,
        rentals: rentals
    }
}

////////////////rental detail with async////////////////////////////
export const fetchRentalById = (rentalId) => {

    // this function will delay dispatch
    return function(dispatch) {
        //我们先call dispatch，可以解决，每次点击新的rentalcard的时候都会先LOAD上一次的card页面，然后过了1秒才会变成新的card
         dispatch(fetchRentalByIdInit());


        // send request to server, async task
        // 在1秒之后， 开始match ID，然后dispatch
        setTimeout(() => {
        // iterate rental array, the two ids must be exactly the same,
        // they both should be string, etc
            const rental = rentals.find((rental) => rental.id === rentalId);
            dispatch(fetchRentalByIdSuccess(rental));
        }, 1000);

    }

}

