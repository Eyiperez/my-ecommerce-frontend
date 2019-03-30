import React from 'react';

const ProductsListContext = React.createContext([{
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
}, {
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
}]);

export default ProductsListContext;