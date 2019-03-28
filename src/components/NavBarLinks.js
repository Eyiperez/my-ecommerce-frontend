import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBarLinks.css'

const NavBarLinks = (props) => {
    //const data = props.data;
    const page = 'Home';
    const links = ['Home', 'Login'];


    return <>
        {links.map((link, index) => {
            let active = 'nav-item nav-link';
            let hover = 'gradientText';
            let to = '/Login';
            if (page === link) {
                active = 'nav-item nav-link active';
                hover = '';
                to = '/';
            }
            return<Link className={active} to={to} key={index}><div className={hover}>{link}</div><span className="sr-only">(current)</span></Link>
               
       
        })}
    </>

}

export { NavBarLinks }