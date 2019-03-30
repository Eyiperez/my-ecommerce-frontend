import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './containers/Home';
import Login from './containers/Login';
import SearchResults from './containers/SearchResults';




class App extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
}



  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBar />
          <Route path='/' exact component={Home} />
          <Route path='/Login' exact component={Login} />
          <Route path='/SearchResults/:query/:cat' exact component={SearchResults} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;