import React from 'react';


const CartList = (props) => {

    const cartItems = props.cartItems

    return cartItems.map((item, index) => {
                return <li className=" media list-group-item d-flex justify-content-between align-items-center" key={index}>
                    <img src={item.image} className="mr-3" alt="..." style={{width: '100px', height:'100px'}}></img>
                    <div className="media-body">
                        <h4>{item.name}</h4>
                        <h5>Price: ${item.price}</h5>
                        <h6>Description: {item.description}</h6></div>
                    <button className="badge badge-secondary badge-pill" onClick={e => { props.deleteItem(index) }}>X</button>
                </li>
            })
}

export { CartList }
