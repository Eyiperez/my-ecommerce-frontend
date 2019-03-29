import React from 'react';
//import { Link } from 'react-router-dom';
import '../styles/NavBarLinks.css'

const NavBarLinks = (props) => {
    console.log(props)
    const page = props.page.page;
    console.log(page)
    const links = ['Home', 'Login', 'Register'];


    return <>
        {links.map((link, index) => {
            let active = 'nav-item nav-link';
            let hover = 'gradientText';
            let to = `/${link}`;
            if (link === 'Home'){
                to = `/`;
            }
            if (page === link) {
                active = 'nav-item nav-link active';
                hover = '';
            }
            return<a className={active} value={link} href={to} key={index}><div className={hover} onClick= {e => { props.onClick({event:e, page:link})}}>{link}</div></a>
                      
        })}
    </>

}

export { NavBarLinks }