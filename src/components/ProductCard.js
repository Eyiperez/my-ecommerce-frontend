import React from 'react';
//import { Link } from 'react-router-dom';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
  


const ProductCard = (props) => {
    const product = props.product

    return <>
    <div style={{margin:'13px'}}>
      <Card>
        <CardImg top width="100%" src={product.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>Price ${product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <Button>See Details</Button>
        </CardBody>
      </Card>
    </div>
    
    </>

}

export { ProductCard }