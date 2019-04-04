import React from 'react';
import { Media, Col } from 'reactstrap';

const ShopCard = (props) => {
    const shopInfo = props.shop;
    //const index = props.index;
    const shopProfile = `/ShopProfile/${shopInfo.name}/${shopInfo.id}`
    return (
        <Col style={{margin:'15px'}}>
        <Media style={{marginTop:'40px'}}>
            <Media left href={shopProfile}>
                <Media object src={shopInfo.seller_photo} alt="..." style={{width:'100px', height:'100px', borderRadius:'80px'}}/>
            </Media>
            <Media body>
                <Media heading>
                    {shopInfo.name}
                </Media>
                {shopInfo.description}
            </Media>
        </Media>
        </Col>
    );
};

export { ShopCard };