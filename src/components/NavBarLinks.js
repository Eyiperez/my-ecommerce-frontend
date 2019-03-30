import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarLinks.css'
import NavsContext from '../contexts/Navs';

const NavBarLinks = () => {
    const links = ['Home', 'Login', 'Register'];

    return <NavsContext.Consumer>

        {value =>

            links.map((link, index) => {
                let active = 'nav-item nav-link';
                let hover = 'gradientText';
                let to = `/${link}`;
                let linkName = link
                if (link === 'Home') {
                    to = `/`;
                }
                if (value === link) {
                    active = 'nav-item nav-link active';
                    hover = '';
                }
                if (link === 'Login' || link === 'Register') {
                    linkName = `Seller ${link}`
                }
                if (value === 'Login' && value === link){
                    linkName = ''

                }
                if (value === 'Register' && value === link){
                    linkName = ''

                }
                return <Link className={active} value={link} to={to} key={index}><div className={hover}>{linkName}</div></Link>
            })
        }
    </NavsContext.Consumer>
}

export { NavBarLinks }