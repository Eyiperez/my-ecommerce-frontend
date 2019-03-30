import React from 'react';
//import { Link } from 'react-router-dom';
import ProductsListContext from '../contexts/ProductsList';
import { ProductCard } from './ProductCard';


const ProductsList = () => {

    return <ProductsListContext.Consumer>

        {value =>

            value.map((product, index) => {
                return <ProductCard key={index} product={product}></ProductCard>
            })
        }
    </ProductsListContext.Consumer>
}

export { ProductsList }