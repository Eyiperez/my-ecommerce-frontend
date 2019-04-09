import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import ShopHeading from '../components/ShopHeading';
import { ProductsList } from '../components/ProductsList';
import ProductsListContext from '../contexts/ProductsList';
import ShopNav from '../components/ShopNav';
import Storage from '../services/storage';
import axios from 'axios';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            image: '',
            description: '',
            sellerName: '',
            sellerEmail: '',
            cartItems: [],
            products: [],
            id: null,
            sellerID: null,
            withProducts: true,
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:3084/shop/${this.props.match.params.id}`)
            .then((shop) => {
                this.setState({
                    name: this.props.match.params.name,
                    image: shop.data.seller_photo,
                    description: shop.data.description,
                    sellerEmail: shop.data.seller_email,
                    sellerName: shop.data.seller_name,
                    id: this.props.match.params.id,
                    sellerID: shop.data.seller_id
                })
                return axios.get(`http://localhost:3084/shop/${this.props.match.params.id}/products`)
            })
            .then((products) => {
                if (products.data.length === 0) {
                    this.setState({ withProducts: false })
                } else {
                    console.log(products.data)
                    this.setState({
                        products: products.data,
                    })
                }
            })
    }

    addToCart = (index) => {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null) {
                    const products = this.state.products;
                    const productSelected = [products[index]];
                    const cartItems = localdata;
                    const newCartItems = cartItems.concat(productSelected);
                    this.setState({
                        cartItems: newCartItems
                    });
                    return newCartItems
                } else {
                    const products = this.state.products;
                    const productSelected = [products[index]];
                    const cartItems = [];
                    const newCartItems = cartItems.concat(productSelected);
                    this.setState({
                        cartItems: newCartItems
                    });
                    return newCartItems
                }
            })
            .then(newCartItems => {
                Storage.saveData('cartItems', (newCartItems))
                    .then(() => {
                        this.setState({ cartItems: newCartItems })
                    })
            })
    }


    render() {

        const { name, description, image, sellerName, sellerEmail, id, products, sellerID, withProducts } = this.state;

        const yesProducts = <ProductsListContext.Provider value={products}>
            <Container style={{ marginTop: '80px' }}>
                <div className='row justify-content-center' >
                    <h1>{name}</h1>
                </div>
                <Row className="clearfix" style={{ margin: '30px' }}>
                    <Col>
                        <div className='row justify-content-center'>
                            <ShopHeading image={image} description={description} sellerName={sellerName} sellerID={sellerID}></ShopHeading>
                        </div>
                    </Col>
                    <Col>
                        <div className='row justify-content-center' style={{ marginRight: '80px' }}>
                            <div>
                                <p >Email me: {sellerEmail}</p>
                                <p >Shop ID: {id}</p>
                                <p >Seller ID: {sellerID}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <ShopNav sellerID={sellerID}></ShopNav>
            </Container>
            <Container style={{ marginTop: '50px' }}>
                <Row>
                    <ProductsList addToCart={this.addToCart}></ProductsList>
                </Row>
            </Container>
        </ProductsListContext.Provider>;

        const noProducts = <ProductsListContext.Provider value={products}>
            <Container style={{ marginTop: '80px' }}>
                <div className='row justify-content-center' >
                    <h1>{name}</h1>
                </div>
                <Row className="clearfix" style={{ margin: '30px' }}>
                    <Col>
                        <div className='row justify-content-center'>
                            <ShopHeading image={image} description={description} sellerName={sellerName} sellerID={sellerID}></ShopHeading>
                        </div>
                    </Col>
                    <Col>
                        <div className='row justify-content-center' style={{ marginRight: '80px' }}>
                            <div>
                                <p >Email me: {sellerEmail}</p>
                                <p >Shop ID: {id}</p>
                                <p >Seller ID: {sellerID}</p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Container>
                <ShopNav sellerID={sellerID}></ShopNav>
            </Container>
            <Container style={{ marginTop: '50px' }}>
                <Row>
                    <h1>No products added yet</h1>
                </Row>
            </Container>
        </ProductsListContext.Provider>;

        if (withProducts === true) {
            return (yesProducts)
        } else {
            return (noProducts)
        }
    }
}

export default withRouter(Home);