import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';
import AuthContext from '../contexts/auth';


const ShopNav = (props) => {

  const shopID = props.shopID
  const shopOrders = `/ShopOrders/${shopID}`

  return (
    <AuthContext.Consumer>
      {
        (user) => {
          if (user) {
            if (user.uid === props.sellerID) {
              return (
                <>
                  <div>
                    <h2>Seller Services</h2>
                    <Nav>
                      <NavItem>
                        <NavLink href="/components/">Add Products</NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink href={shopOrders}>Orders</NavLink>
                      </NavItem>
                    </Nav>
                  </div>
                </>
              )
            } else {
              return <h2>  </h2>
            }

          } else {
            return <h2>  </h2>
          }
        }
      }
    </AuthContext.Consumer>)

};


export default ShopNav;

