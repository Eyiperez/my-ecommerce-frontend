import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row } from 'reactstrap';

import ViewDetailsModal from './ViewDetails';
  


const ProductCard = (props) => {
    const product = props.product
    const index = props.index

    return <>
    <div style={{margin:'13px'}}>
      <Card>
        <CardImg top width="100%" src={product.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>Price ${product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Row>
          <Button style={{marginRight:'5px'}} onClick={e => {props.addToCart(index)}}>Add to Cart</Button>
          <ViewDetailsModal productInfo={props.product}></ViewDetailsModal>
          </Row>
        </CardBody>
      </Card>
    </div>
    
    </>

}

export { ProductCard }