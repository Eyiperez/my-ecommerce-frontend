import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


const ShopNav = (props) => {

    return <div>
    <h2>Seller Services</h2>
    <Nav>
      <NavItem>
      <NavLink href="/components/">Edit Products</NavLink>
      </NavItem>
      <NavItem>
      <NavLink href="/components/">Orders</NavLink>
      </NavItem>
    </Nav>
  </div>

};


export default ShopNav;