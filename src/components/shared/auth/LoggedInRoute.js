import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import authService from '../../../services/auth-service';


//用来disable register。 当我们login了之后，我们不希望输入register这个link，然后又出现register页面
//作法同protectedroute
export function LoggedInRoute(props) {

    //这里本来的写法是{component， exact， route}， 就是对应APP.JS中的那个你想protect的route，我们把它简写为这样。
    //<Route exact path='/rentals/:id' component={RentalDetail}/>
    //对照愿路径，return的部分也很好理解，相当于，在component的部分加入if条件判断。如果。。。我们就render原写法，否则回到login
    const {component: Component, ...rest} = props;

    return (
        <Route {...rest} render={(props) => authService.isAuthenticated()
                                            ? <Redirect to={{pathname: '/rentals'}}/>
                                            : <Component {...props}{...rest}/>}/>
    )
}