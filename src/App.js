import React, { Component } from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import NavBar from './components/navBar';
import Home from './containers/Home';
import Login from './containers/Login';
import SearchResults from './containers/SearchResults';
//import Navs from './contexts/Navs'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
//page: 'Home'
    }
}




// }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
        {/* <Navs.Provider value= {this.state.page}> */}
          <NavBar />
          <Route path='/' exact component={Home} />
          <Route path='/Login' exact component={Login} />
          <Route path='/SearchResults/:query/:cat' exact component={SearchResults} />
          {/* </Navs.Provider> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
