import React from 'react';
import { Media, Container, Row } from 'reactstrap';

const ProductDetail = (props) => {
    const product = props.product;
    const description = product.description;
    const price = product.price;
    const name = product.name;
    const likes = product.likes;
    const image = product.image;
    const shopName = product.shop_name;

    return (
        <Media>
            <Container>
                <Row>
                    <Media left href={image}>
                        <Media object src={image} alt="..." style={{ width: '470px', height: '470px' }} />
                    </Media>

                    <Media body>
                        <br></br>
                        <Media heading>
                            {name}
                        </Media>
                        <h4>Price: ${price}</h4>
                        <h4>Likes {likes}</h4>
                        <h4>From shop {shopName}</h4>
                        <h5>{description}</h5>
                    </Media>
                </Row>
            </Container>
        </Media>
    );
};

export default ProductDetail;
