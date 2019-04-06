import React from 'react';
import { Media } from 'reactstrap';

const ShopHeading = (props) => {
    const description = props.description;
    const image = props.image;
    const sellerName = props.sellerName;

    return (
        <Media>
            <Media left href="#">
                <Media object src={image} alt="Generic placeholder image" style={{ borderRadius: '80px' }} />
            </Media>
            <Media body >
                <Media heading styel={{ marginLeft: '100px' }}>
                    {sellerName}' shop!
        </Media>
                {description}
            </Media>
        </Media>
    );
};

export default ShopHeading;