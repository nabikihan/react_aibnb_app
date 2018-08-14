import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect} from 'react-router-dom';
import {Provider} from 'react-redux';

import {Header} from './components/shared/Header';
import RentalListing from './components/rental/rental-listing/RentalListing';
import RentalDetail from './components/rental/rental-detail/RentalDetail';
//这两个你都是export BY default，你就不需要{}

import './App.css';




// routing, 写法和propS是一样的，就是给route赋予一个PROPS

const store = require('./reducers/index').init();
class App extends Component {


  render() {

    return (

        <Provider store={store}>
            <BrowserRouter>
                <div className="App">
                    <Header />

                    <div className='container'>
                        <Route exact path='' render={() => <Redirect to='/rentals'/>} />
                        <Route exact path='/rentals' component={RentalListing} />
                        <Route exact path='/rentals/:id' component={RentalDetail}/>
                    </div>
                </div>
            </BrowserRouter>
        </Provider>

    );
  }
}

export default App;


