import React from 'react';


const CartList = (props) => {
    //const data = props.data;
    const items = [{
        "id": 2,
        "shop_id": 1,
        "name": "Small balloon",
        "price": 1,
        "image": "https://source.unsplash.com/random/80x80",
        "description": "yellow, air",
        "category": "birthday",
        "color": "yellow",
        "likes": null,
        "shop_name": "Balloon Shop"
    },{
        "id": 1,
        "shop_id": 1,
        "name": "Big balloon",
        "price": 3,
        "image": "https://source.unsplash.com/random/80x80",
        "description": "giant balloon, pink, helium",
        "category": "babyshower",
        "color": "pink",
        "likes": null,
        "shop_name": "Balloon Shop"
    }]
    const title = 'Items'

    return <>
        <h4>{title} List</h4>
        <ul className="list-group">
            {items.map((item, index) => {
                return <li className=" media list-group-item d-flex justify-content-between align-items-center" key={index}>
                <img src={item.image}className="mr-3" alt="..."></img>
                        <div className="media-body">
                        <h5>{item.name}</h5>
                        <h5>{item.price}</h5>
                        <h5>{item.description}</h5></div>
                        <button className="badge badge-secondary badge-pill" onClick={e => { props.onClick(index) }}>X</button>
                    </li>                
            })}
        </ul>
    </>

}

export { CartList }
