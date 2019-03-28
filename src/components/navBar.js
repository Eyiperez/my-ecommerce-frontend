import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { NavBarLinks } from './NavBarLinks';
import '../styles/NavBarLinks.css';
import CartModal from './CartModal';
import SearchBar from './SearchBar';


class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
            cart: [],
            searchCat: 'name',
        }
    }

    render() {
        return (
            <>
                <nav className="my-nav navbar navbar-expand-lg navbar-light">
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <NavBarLinks></NavBarLinks>
                    </form>
                    <SearchBar />
                    <CartModal></CartModal>
                </nav>


            </>
        )
    }

}

export default withRouter(NavBar);