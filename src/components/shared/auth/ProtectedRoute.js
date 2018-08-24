import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import authService from '../../../services/auth-service';


//完善logout。我们不希望某写子页面在logout出去之后，直接输入子页面连接仍然可以进去
// 这里的想法就是，我们写一个protect的函数，然后在APP.JS页面，对于我们想protect的link，我们把ROUTE 换成该函数。
export function ProtectedRoute(props) {

    //这里本来的写法是{component， exact， route}， 就是对应APP.JS中的那个你想protect的route，我们把它简写为这样。
    //<Route exact path='/rentals/:id' component={RentalDetail}/>
    //对照愿路径，return的部分也很好理解，相当于，在component的部分加入if条件判断。如果。。。我们就render原写法，否则回到login
    const {component: Component, ...rest} = props;

    return (
        <Route {...rest} render={(props) => authService.isAuthenticated()
                                            ? <Component {...props}{...rest}/>
                                            : <Redirect to={{pathname: '/login'}}/>}/>
    )
}