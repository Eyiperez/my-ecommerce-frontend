import React from 'react';
import ShopsListContext from '../contexts/ShopsList';
import { ShopCard } from './ShopCard';



const ShopsList = (props) => {

    return <ShopsListContext.Consumer>
        {value =>

            value.map((shop, index) => {
                return <ShopCard key={index} shop={shop} index={index}></ShopCard>
            })
        }
    </ShopsListContext.Consumer>
}

export { ShopsList }