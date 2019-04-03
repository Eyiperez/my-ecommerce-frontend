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
            page: '',
            location: this.props.location.pathname,
        }

    }
    componentDidMount = () => {
        const currentPage = this.props.location.pathname;
        if (currentPage === '/Login') {
            this.setState({ page: 'Login' })
        }
        if (currentPage === '/') {
            this.setState({ page: 'Home' })
        }
        if (currentPage === '/Register') {
            this.setState({ page: 'Register' })
        }
        if (currentPage !== '/Register' && currentPage !== '/' && currentPage !== '/Login') {
            this.setState({ page: '' })
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            const currentPage = this.props.location.pathname;
            if (currentPage === '/Login') {
                this.setState({ page: 'Login' })
                console.log(this.state.page)
            }
            if (currentPage === '/') {
                this.setState({ page: 'Home' })
            }
            if (currentPage === '/Register') {
                this.setState({ page: 'Register' })
            }
            if (currentPage !== '/Register' && currentPage !== '/' && currentPage !== '/Login') {
                this.setState({ page: '' })
            }
        }
    }


    render() {

        return (
            <NavsContext.Provider value={this.state.page}>
                <nav className="body sticky-top my-nav navbar navbar-expand-lg navbar-light" style={{backgroundColor: 'white'}}>
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <NavBarLinks></NavBarLinks>
                    </form>
                    <SearchBar />
                    <CartModal></CartModal>
                </nav>

                {/* <nav className="my-nav navbar navbar-expand-lg navbar-light">
                    <form className="navbar-nav">
                        <Link className="navbar-brand" to="/">Navbar</Link>
                        <NavBarLinks page={this.state.page} onClick={this.activePage}></NavBarLinks>
                    </form>
                    <SearchBar />
                    <CartModal></CartModal>
                </nav> */}

            </NavsContext.Provider>

        )
    }

}

export default withRouter(NavBar);