import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './containers/Home';
import Login from './containers/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Route path='/' exact component={Home} />
          <Route path='/Login' exact component={Login} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
