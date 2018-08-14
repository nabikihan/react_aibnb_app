import React from 'react';
import {RentalCard} from './RentalCard';


//这个就是用来iterate每一个rental card

// remove this export, because 我们已经在下面export了，不能export两次
export class RentalList extends React.Component {


    //to iterate the rentals array, and each element is a rental card
    // map的input叫啥不重要，它表示RENTALS ARRAY的元素
    // KEY = {INDEX} 是react语法要求，没什么特殊含义。
    // rental card de props 叫做COLNUM,
    //rental ={rental} 这个意思就是说，因为我们在constructor中把data assign给了rental array，然后我们在child rentalcard中
    // 要把它的各个参数都转化为data中的参数，这样我们需要把这个data array传给rental card，我们知道map中的input rental就是指代dataarray中的每一个元素
    // 所以我们设一个PROP 参数 rental，当然你也可以叫别的，但是要保证和card中的参数名称一致，把input rental赋值给这个rental变量就可以了。然后
    // 在rentalcard中，设个CONST 拿到这个PROPS参数，就可以对rental card中的各个部分进行命名了。

    //this.props.rentals（也就是rental array）让它里面的每一个元素RENTAL, 用变量rental来标记

    renderRentals() {
        return this.props.rentals.map((rentalelement, index) => {
           // debugger;
            return (
                <RentalCard key={index}
                            colNum='col-md-3 col-xs-6'
                            rental={rentalelement}/>
            )
        });
    }


    //那么这个code的顺序就是，我们先run这个render，进去后它会call renderrentals这个遍历函数，
    // 遍历函数会遍历this.state.rentals这个array，然后callback function就是返回每一个array元素
    // 而且你会发现展示元素的个数和你写的rentals的个数一样，你写3个就有3个card，4就是4个 card
    render() {
        return (
            <div className='row'>
                    {this.renderRentals()}
            </div>

        );
    }


}

