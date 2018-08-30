import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import Header from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
import RentalSearchListing from 'components/rental/rental-listing/RentalSearchListing';
import { RentalCreate } from './components/rental/rental-create/RentalCreate';
//这两个你都是export BY default，你就不需要{}

import Login from './components/login/Login';
import {Register} from './components/register/Register';
import * as actions from 'actions';

import {ProtectedRoute} from './components/shared/auth/ProtectedRoute';
import {LoggedInRoute} from "./components/shared/auth/LoggedInRoute";

import './App.css';


// routing, 写法和propS是一样的，就是给route赋予一个PROPS

const store = require('./reducers/index').init();
class App extends Component {

    //用来了检查login的TOKEN是否之前已经在local storage里面存在
    componentWillMount() {
        //debugger;
       store.dispatch(actions.checkAuthState());
    }

    /////////////logout/////////////////
    logout() {
        store.dispatch(actions.logout());
    }


//这里的 意思就是，router 会展示 对应的component的内容
  render() {


        //注意，rentalcreate 一定要在rentaldetail的上面，如果在下面，则当你想打开一个rental create页面 ，app会先run detailpage，
      //你会看见一个loading的字眼。
  return (

        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header logout={this.logout} />

                    <div className='container'>

                        <Switch>
                            <Route exact path='/' render={() => <Redirect to='/rentals'/>} />
                            <Route exact path='/rentals' component={RentalListing} />
                            <Route exact path='/rentals/:city/homes' component={RentalSearchListing} />
                            <ProtectedRoute exact path='/rentals/new' component={RentalCreate} />
                            <ProtectedRoute exact path='/rentals/:id' component={RentalDetail}/>
                            <Route exact path='/login' component={Login} />
                            <LoggedInRoute exact path='/register' component={Register} />
                        </Switch>

                    </div>
                </div>
            </BrowserRouter>
        </Provider>

    );
  }
}

export default App;


