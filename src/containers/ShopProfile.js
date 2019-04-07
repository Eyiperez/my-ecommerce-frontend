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
            products: [{
                "id": 1,
                "shop_id": 1,
                "name": "Small balloon",
                "price": 1,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "yellow, air",
                "category": "birthday",
                "color": "yellow",
                "likes": null,
                "shop_name": "Balloon Shop"
            }, {
                "id": 2,
                "shop_id": 1,
                "name": "Big balloon",
                "price": 3,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "giant balloon, pink, helium",
                "category": "babyshower",
                "color": "pink",
                "likes": null,
                "shop_name": "Balloon Shop"
            }, {
                "id": 3,
                "shop_id": 1,
                "name": "Small balloon",
                "price": 1,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "yellow, air",
                "category": "birthday",
                "color": "yellow",
                "likes": null,
                "shop_name": "Balloon Shop"
            }, {
                "id": 4,
                "shop_id": 1,
                "name": "Big balloon",
                "price": 3,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "giant balloon, pink, helium",
                "category": "babyshower",
                "color": "pink",
                "likes": null,
                "shop_name": "Balloon Shop"
            }, {
                "id": 5,
                "shop_id": 1,
                "name": "Small balloon",
                "price": 1,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "yellow, air",
                "category": "birthday",
                "color": "yellow",
                "likes": null,
                "shop_name": "Balloon Shop"
            }, {
                "id": 6,
                "shop_id": 1,
                "name": "Big balloon",
                "price": 3,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "giant balloon, pink, helium",
                "category": "babyshower",
                "color": "pink",
                "likes": null,
                "shop_name": "Balloon Shop"
            }],
            id: null,
            sellerID: null,
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:3084/shop/${this.props.match.params.id}`)
        .then((shop) =>{
            this.setState({
                name: this.props.match.params.name,
                image: shop.data.seller_photo,
                description: shop.data.description,
                sellerEmail: shop.data.seller_email,
                sellerName: shop.data.seller_name,
                id: this.props.match.params.id,
                sellerID: shop.data.seller_id
            })
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

        const { name, description, image, sellerName, sellerEmail, id, products, sellerID } = this.state;

        return (
            <>
                <ProductsListContext.Provider value={products}>
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
                </ProductsListContext.Provider>
            </>
        )
    }

}

export default withRouter(Home);