import React from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, Row } from 'reactstrap';

import ViewDetailsModal from './ViewDetails';
import { useAlert } from 'react-alert';

  


const ProductCard = (props) => {
  const alert = useAlert()
 
    const product = props.product
    const index = props.index

    return <>
    <div style={{marginRight:'30px', marginTop:'15px', marginLeft:'10px'}}>
      <Card style={{width:'240px', height:'400px'}}>
        <CardImg top width="100%" src={product.image} alt="Card image cap" />
        <CardBody>
          <CardTitle>{product.name}</CardTitle>
          <CardSubtitle>Price ${product.price}</CardSubtitle>
          <CardText>{product.description}</CardText>
          <CardText>Color: {product.color}</CardText>
          <Row>
          <Button style={{marginRight:'5px'}} onClick={e => {props.addToCart(index); alert.show(<div style={{ color: 'white' }}>Item {product.name} added to cart</div>)}} >Add to Cart</Button>
          <ViewDetailsModal productInfo={props.product}></ViewDetailsModal>
          </Row>
        </CardBody>
      </Card>
    </div>
    
    </>

}

export { ProductCard }