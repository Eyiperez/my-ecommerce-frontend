import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { NavBarLinks } from './NavBarLinks';
import '../styles/NavBarLinks.css';
import CartModal from './CartModal';
import SearchBar from './SearchBar';
import NavsContext from '../contexts/Navs';


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            cart: [],
            searchCat: 'name',
            page: 'Register'
        }
    }


    // activePage = (e) => {
    //     this.setState({ page: e.page })
    // }

    render() {
        return (
            <NavsContext.Consumer>
            {
                (value)  => {
                    
                    return <nav className="my-nav navbar navbar-expand-lg navbar-light">
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <NavBarLinks page={value} onClick={this.activePage}></NavBarLinks>
                    </form>
                    <SearchBar />
                    <CartModal></CartModal>
                </nav>
                
                }
            }
                {/* <nav className="my-nav navbar navbar-expand-lg navbar-light">
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <NavBarLinks page={this.state.page} onClick={this.activePage}></NavBarLinks>
                    </form>
                    <SearchBar />
                    <CartModal></CartModal>
                </nav> */}
            
            </NavsContext.Consumer>
        )
    }

}

export default withRouter(NavBar);