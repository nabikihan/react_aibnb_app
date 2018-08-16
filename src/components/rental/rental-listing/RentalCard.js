import React from 'react';
import {Link} from 'react-router-dom';
import {rentalType} from "../../../helpers";

// we put a props argument, so that rentalcard(child) can receive its props from its father rentallist

// <a href>就是我们把整个的A lINK中的部分作为一个大 link，点它我们就去了rental detail， 因为APP.JS规定它的routing是RENTALS/ID ,任何ID都可以
export function RentalCard(props) {

    const rental = props.rental;
    return(
        <div className={props.colNum}>
            <Link className='rental-detail-link' to={`/rentals/${rental._id}`}>
                <div className='card bwm-card'>
                    <img className='card-img-top' src={rental.image} alt='rental main image'></img>
                    <div className='card-block'>
                        <h6 className={`card-subtitle ${rental.category}`}>{rentalType(rental.shared)} {rental.category} &#183; {rental.city}</h6>
                        <h4 className='card-title'>{rental.title}</h4>
                        <p className='card-text'>${rental.dailyRate} per Night &#183; Free Cancelation</p>
                        <a href='' class='card-link'>More Info</a>
                    </div>
                </div>
            </Link>

        </div>
    );



}