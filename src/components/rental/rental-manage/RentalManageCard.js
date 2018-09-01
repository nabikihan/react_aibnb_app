import React from 'react';
import { toUpperCase, pretifyDate } from '../../../helpers';
import { Link } from 'react-router-dom';

export class RentalManageCard extends React.Component {

    constructor() {
        super();

        this.state = {
            wantDelete: false
        }
    }

    //就是你点击delete这个键，会出来一个小菜单选项YES OR NO . 见笔记图片
    //这里小菜单的设置其实和modal的原理一样，就是用一个state的flag，来控制小菜单的开关。
    // 你把wantdelete想象成open，就可以了。
    showDeleteMenu() {
        this.setState({
            wantDelete: true
        });
    }

    //隐藏delete菜单
    closeDeleteMenu() {
        this.setState({
            wantDelete: false
        })
    }

    //当我们delete结束之后，我们要把state 改为false，这样就不会再自动框下一个card，然后show delete menu了。如果你不set state为false，当你
    //delete完一个card，那个红框会自动的框下一个card，然后下一个card的delete menu自动打开。
    deleteRental(rentalId, rentalIndex) {
        this.setState({wantDelete: false});

        this.props.deleteRentalCb(rentalId, rentalIndex);
    }


    render() {

        // 这些参数是rental manage的iteration中传给props的, 你可以改名字（例如delete rental与这个页面的函数重名了，我们加上CB ）
       const { rental, modal, rentalIndex } = this.props;
         const { wantDelete } = this.state;

         //这里我们用一个 TOBEdeleted的tag 标记一下整个要被delete的card，因为我们希望要被delete的card的边框为红色，
        //这样我可以根据这个tag去styles里面加个边框颜色。
         const deleteClass = wantDelete ? 'toBeDeleted' : '';

        return (
            <div className='col-md-4'>

                <div className={`card text-center ${deleteClass}`}>
                    <div className='card-block'>
                        <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
                        <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}>Go to Rental</Link>
                        { rental.bookings && rental.bookings.length > 0 && modal }
                    </div>
                    <div className='card-footer text-muted'>
                        Created at {pretifyDate(rental.createdAt)}


                        {/*展示delete的小菜单*/}
                        { !wantDelete &&
                        <button onClick={() => { this.showDeleteMenu() }} className='btn btn-danger'> Delete </button>
                        }
                        { wantDelete &&
                            <div className='delete-menu'>
                                Do you confirm?
                                <button onClick={() => {this.deleteRental(rental._id, rentalIndex)}} className='btn btn-danger'> Yes </button>
                                <button onClick={() => { this.closeDeleteMenu() }} className='btn btn-success'> No </button>
                            </div>
                        }
                    </div>
                </div>
             </div>
        )
    }

}


/////////////之前的version，没有delete，只是export function，把props作为参数传进去////////////////////////////
// 那么export function的画，就没有render，直接在return中写 JSX

// export function RentalManageCard (props) {
//
//     // rental是从rental manage的那个iterator里得到的
//     const {rental, modal} = props;
//
//     return(
//         <div className='col-md-4'>
//             <div className='card text-center'>
//                 <div className='card-block'>
//                     <h4 className='card-title'>{rental.title} - {toUpperCase(rental.city)}</h4>
//                     <Link className='btn btn-bwm' to={`/rentals/${rental._id}`}> Go to Rental</Link>
//                     {/*<button className='btn btn-bwm'> Bookings </button>*/}
//
//                     { rental.bookings && rental.bookings.length > 0 && modal}
//
//                 </div>
//                 <div className='card-footer text-muted'>
//                     Created at {pretifyDate(rental.createAt)}
//                 </div>
//             </div>
//         </div>
//
//     )
//
// }