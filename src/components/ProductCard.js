import React from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
  


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
          <Button style={{marginRight:'5px'}} onClick={e => {props.addToCart(index)}}>Add to Cart</Button>
          <Button style={{}}>See details</Button>
        </CardBody>
      </Card>
    </div>
    
    </>

}

export { ProductCard }