import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarLinks.css'

const NavBarLinks = (props) => {
    //const data = props.data;
    const page = 'Home';
    const links = ['Home', 'Login'];


    return <>
        {links.map((link, index) => {
            let active = 'nav-item';
            let hover = 'gradientText';
            let to = '/Login';
            if (page === link) {
                active = 'nav-item active';
                hover = '';
                to = '/';
            }
            return <ul className="navbar-nav">
                <li className={active} key={index}>
                    <Link className="nav-link" to={to}><div className={hover}>{link}</div><span className="sr-only">(current)</span></Link>
                </li>
            </ul>
        })}
    </>

}

export { NavBarLinks }