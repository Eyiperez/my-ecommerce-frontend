import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Container, ListGroup, Button } from 'reactstrap';
import { OrdersList } from '../components/OrdersList';
import axios from 'axios';


class ShopOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopID: null,
            shopName: '',
            orders: []
        }
    }
    componentDidMount() {
        const shopID = this.props.match.params.id;
        const shopName = this.props.match.params.name;
        axios.get(`http://localhost:3084/shop/${shopID}/orders`)
            .then((res) => {
                const orders = res.data;
                this.setState({ shopID: shopID, shopName: shopName, orders: orders });
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })

    }

    orderStatusUpdate = (productID) => {
        console.log(productID)
    }


    render() {

        const { shopID, shopName, orders } = this.state;
        const shopProfile = `/ShopProfile/${shopName}/${shopID}`

        return (
            <>
                <Container style={{ marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Orders for shop {shopName} ID # {shopID}</h1>
                    </div>
                    <ListGroup>
                        <OrdersList orderStatus={this.orderStatusUpdate} orders={orders}></OrdersList>
                    </ListGroup>
                    <div style={{ textAlign: 'center' }}>
                        <Link to={shopProfile}><Button style={{ backgroundColor: '#f9498e', borderColor: '#f9498e', marginTop: '20px' }}><h3>Back to profile</h3></Button></Link>{' '}
                    </div>
                </Container>
            </>

        )
    }

}

export default withRouter(ShopOrders);