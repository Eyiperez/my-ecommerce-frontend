import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Storage from '../services/storage';
import { ProductsList } from '../components/ProductsList';
import ProductsListContext from '../contexts/ProductsList';
import ShopsListContext from '../contexts/ShopsList';
import { ShopsList } from '../components/ShopList';
import HorizontalImages from '../components/horizontalImages';
import '../styles/home.css'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            recentlyViewed: [],
            trending: [],
            cartItems: [],
            shops: [
                {
                    "id": 1,
                    "name": "Balloon Shop",
                    "owner": 1,
                    "description": "the best prettiest balloons ever",
                    "seller_name": "Tom",
                    "seller_email": "tom@email.com",
                    "seller_photo": "https://source.unsplash.com/random/200x200"
                },
                {
                    "id": 2,
                    "name": "Favors Shop",
                    "owner": 2,
                    "description": "handmade, unique, best party favors",
                    "seller_name": "Sara",
                    "seller_email": "sara@email.com",
                    "seller_photo": "https://source.unsplash.com/random/200x200"
                },
                {
                    "id": 3,
                    "name": "Decorations Shop",
                    "owner": 3,
                    "description": "cheap, cool decorations",
                    "seller_name": "Luz",
                    "seller_email": "luz@email.com",
                    "seller_photo": "https://source.unsplash.com/random/200x200"
                }]
        }
    }
    componentDidMount() {
        Storage.getRecentlyViewed()
            .then(localdata => {
                if (localdata !== null) {
                    this.setState({
                        recentlyViewed: localdata,
                    });
                } else {
                    // handle empty string
                    this.setState({
                        recentlyViewed: [],
                    });
                }
            },
                (errorLoad) => {
                    this.setState({
                        loading: true,
                        errorLoad
                    });
                }
            )
    }

    // window.addEventListener(
    //     "beforeunload",
    //     this.saveStateToData.bind(this)
    // );
    // }


    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToData.bind(this)
        );
        // saves if component has a chance to unmount
        //this.saveStateToData(this.state.cartItems)
    }


    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('recentlyViewed', (this.state.recentlyViewed))
            .then(result => {
                console.log('recentlyViewed', result)
            })
    }

    addToCart = (index) => {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null) {
                    const products = this.state.recentlyViewed;
                    const productSelected = [products[index]];
                    const cartItems = localdata;
                    const newCartItems = cartItems.concat(productSelected);
                    this.setState({
                        cartItems: newCartItems
                    });
                    return newCartItems
                } else {
                    const products = this.state.recentlyViewed;
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
        return (
            <>
                <ProductsListContext.Provider value={this.state.recentlyViewed}>
                    <div className='home' style={{ padding: '80px', justifyContent: 'center', textAlign: 'center' }}>
                        <h1 style={{ color: 'white' }}>festive</h1>
                        <h1 style={{ color: 'white' }}>The place to be to have the party to be at!</h1>
                    </div>
                    <Container style={{ marginTop: '40px', width: '800px', height: '400px' }}>
                        <div className='row justify-content-center' style={{ marginTop: '40px' }}>
                            <h2>What is trending in events</h2>
                        </div>
                        <HorizontalImages></HorizontalImages>
                    </Container>
                    <Container style={{ marginTop: '100px' }}>
                        <Row>
                            <h2>Recently Viewed</h2>
                        </Row>
                        <Row>
                            <ProductsList addToCart={this.addToCart} ></ProductsList>
                        </Row>
                    </Container>
                </ProductsListContext.Provider>
                <ShopsListContext.Provider value={this.state.shops}>
                    <Container style={{ marginTop: '40px' }}>
                        <Row>
                            <Col>
                                <h2>Popular Shops</h2>
                            </Col>
                        </Row>
                        <Row>
                            <ShopsList></ShopsList>
                        </Row>
                    </Container>;
        </ShopsListContext.Provider>
            </>

        )
    }

}

export default withRouter(Home);