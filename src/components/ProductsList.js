import React from 'react';
import ProductsListContext from '../contexts/ProductsList';
import { ProductCard } from './ProductCard';



const ProductsList = (props) => {

    return <ProductsListContext.Consumer>
        {value =>

            value.map((product, index) => {
                return <ProductCard key={index} product={product} addToCart={props.addToCart} index={index}></ProductCard>
            })
        }
    </ProductsListContext.Consumer>
}

export { ProductsList }