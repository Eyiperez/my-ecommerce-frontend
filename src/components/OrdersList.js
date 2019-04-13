import React from 'react';
import { ListGroupItem } from 'reactstrap';


const OrdersList = (props) => {

    const ordersItems = props.orders;

    return ordersItems.map((item, index) => {
        return <ListGroupItem key={index}>
            <div className="media-body">
                <h4>Product ID: {item.product_id}</h4>
                <h4>Buyer name: {item.buyer}</h4>
                <h5>Address: {item.address}</h5>
                <h6>Buyer email: {item.email} </h6></div>
            <button className="badge badge-secondary badge-pill" onClick={e => { props.orderStatus(item.product_id) }}>{item.status}</button>
        </ListGroupItem>
    })
}

export { OrdersList }
