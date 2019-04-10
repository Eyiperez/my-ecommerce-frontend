import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import firebase from './firebase';

//****pages */
import NavBar from './components/navBar';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import SearchResults from './containers/SearchResults';
import ShopProfile from './containers/ShopProfile';
import Footer from './components/Footer';
import LogOut from './containers/LogOut';
import Checkout from './containers/Checkout';
import CompleteOrder from './containers/CompleteOrder';
import ShopOrders from './containers/ShopOrders';

//***contexts */
import AuthContext from './contexts/auth';





class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
}


state = {
  user: null
}

componentDidMount() {
  this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      this.setState({ user });
    }
    else {
      this.setState({ user: null })
    }
  })
}

componentWillUnmount() {
  this.unsubscribe()
}



  render() {
    return (
      <div className="App">
        <BrowserRouter>
        <AuthContext.Provider value={this.state.user}>
          <NavBar />
          <Route path='/' exact component={Home} />
          <Route path='/Login' exact component={Login} />
          <Route path='/Signup' exact component={Register} />
          <Route path='/LogOut' exact component={LogOut} />
          <Route path='/SearchResults/:query/:cat' exact component={SearchResults} />
          <Route path='/ShopProfile/:name/:id' exact component={ShopProfile} />
          <Route path='/Checkout' exact component={Checkout} />
          <Route path='/CompleteOrder/:id' exact component={CompleteOrder} />
          <Route path='/ShopOrders/:id' exact component={ShopOrders} />
          <Footer/>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;