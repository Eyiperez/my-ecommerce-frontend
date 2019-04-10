import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, ListGroup, Form, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap';
import { CartList } from '../components/CartList';
import Storage from '../services/storage';
import axios from 'axios';


class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'Checkout',
            cartItems: [],
            total: 0,
            email: '',
            name: '',
            address: '',
            payment: '',
            buyerID: null
        }
    }

    componentDidMount() {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null && localdata.length !== this.state.cartItems.length) {
                    this.setState({ cartItems: localdata });
                } else {
                    // handle empty string
                    this.setState({ cartItems: [] });
                }
            })
            .then(() => {
                if (this.state.cartItems !== []) {
                    return this.getTotal(this.state.cartItems)
                } else {
                    return 0
                }
            })
            .then(total => {
                this.setState({ total: total });
            })
    }

    getTotal = (cartItems) => {
        return (cartItems).reduce((acc, cur) => {
            const sum = (acc + cur.price)
            return sum
        }, 0)
    }

    componentDidUpdate() {
        Storage.getData()
            .then(localdata => {
                const cartdata = localdata;
                if ((localdata !== null) && (localdata.length !== this.state.cartItems.length)) {
                    const total = this.getTotal(cartdata)
                    this.setState({ cartItems: cartdata, total: total });
                }
            })
    }

    deleteItem = (index) => {
        const currentCartItems = this.state.cartItems;
        const newItems = [...currentCartItems]
        newItems.splice(index, 1);
        Storage.saveData('cartItems', (newItems))
            .then(() => {
                this.setState({ cartItems: newItems })
            })
            .then(() => {
                return this.getTotal(this.state.cartItems)
            })
            .then(total => {
                this.setState({ total: total });
            })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, name, address, cartItems } = this.state;
        const newBuyer = { name: name, email: email, address: address, payment_info: 'paid' }

        axios.post('http://localhost:3084/buyer/', newBuyer)

            .then((res) => {
                const buyerID = res.data.id;
                let orderedItem = {};
                cartItems.map((item, index) => {
                    orderedItem = { product_id: item.id, buyer_id: buyerID, quantity: 1, status: 'not processed' }
                    return axios.post('http://localhost:3084/order/', orderedItem)                    
                })
                this.setState({ buyerID: buyerID})
            })
            .then(()=>{
                this.setState({ email: '', name: '', address: '', payment:''})
                return Storage.saveData('cartItems', ([]))
            })
            .then(()=>{
                this.props.history.push(`/CompleteOrder/${this.state.buyerID}`);
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }


    render() {

        const { total, cartItems, email, address, name, payment } = this.state;

        return (
            <>
                <Container style={{ marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Checkout</h1>
                    </div>
                    <div>
                        <ListGroup>
                            <CartList cartItems={cartItems} deleteItem={this.deleteItem} />
                        </ListGroup>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <h1>Total = ${total}</h1>
                    </div>
                </Container>
                <Container style={{ marginTop: '40px' }}>
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="email" value={email} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleName">Name</Label>
                                    <Input type="text" name="name" id="exampleName" placeholder="name" value={name} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleAddress">Address</Label>
                            <Input type="text" name="address" id="exampleaddress" placeholder="Somewhere" value={address} onChange={this.handleChange} />
                        </FormGroup>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Card Number</Label>
                                    <Input type="text" name="payment" id="examplePayment" placeholder="card number" value={payment} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button onClick={this.handleSubmit} style={{ backgroundColor: '#f9498e', borderColor: '#f9498e', color: 'white' }}>Submmit Order</Button>
                    </Form>
                </Container>
            </>
        )
    }

}

export default withRouter(Checkout);