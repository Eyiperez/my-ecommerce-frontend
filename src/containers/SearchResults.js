import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { ProductsList } from '../components/ProductsList';
import ProductsListContext from '../contexts/ProductsList';
import ShopsListContext from '../contexts/ShopsList';
import Storage from '../services/storage';
import HorizontalImages from '../components/horizontalImages';
import { ShopsList } from '../components/ShopList';
//import axios from 'axios'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
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
            search: '',
            searchBy: '',
            location: this.props.location.pathname,
            cartItems: [],
            loading: false,
            errorLoad: null,
            withShops: true,
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
                },
                {
                    "id": 4,
                    "name": "Favors Shop",
                    "owner": 2,
                    "description": "handmade, unique, best party favors",
                    "seller_name": "Sara",
                    "seller_email": "sara@email.com",
                    "seller_photo": "https://source.unsplash.com/random/200x200"
                },
                {
                    "id": 5,
                    "name": "Decorations Shop",
                    "owner": 3,
                    "description": "cheap, cool decorations",
                    "seller_name": "Luz",
                    "seller_email": "luz@email.com",
                    "seller_photo": "https://source.unsplash.com/random/200x200"
                }
            ]
        }
    }

    // requestSearch = (query) => {
    //     axios.get('https://www.googleapis.com/youtube/v3/search?'+
    //     'part=snippet'+
    //     '&maxResults=25'+
    //     `&q=${query}`+
    //     '&key=AIzaSyDz8Y-kxmUsaG8dRq0dvYqEq6UXE-jUFy4').then(
    //         (res)=>{
    //             console.log(res.data)
    //             this.setState({
    //                 videoData:res.data.items,
    //                 loadVideo:true
    //             })  
    //         }
    //     )
    // }

    componentDidMount() {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null) {
                    this.setState({
                        cartItems: localdata,
                        search: this.props.match.params.query,
                        searchBy: this.props.match.params.cat
                    });
                } else {
                    // handle empty string
                    this.setState({
                        cartItems: [],
                        search: this.props.match.params.query,
                        searchBy: this.props.match.params.cat
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

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({
                search: this.props.match.params.query,
                searchBy: this.props.match.params.cat,
                alertOn: false
            })
        }
    }

    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('cartItems', (this.state.cartItems))
            .then(result => {
                console.log('cartItems', result)
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
        const { search, searchBy, products, shops, withShops, errorLoad, loading } = this.state;
        const yesShops = <Container style={{ marginTop: '40px' }}><Row><Col><h2>Shops</h2></Col></Row><Row><ShopsList></ShopsList></Row></Container>;
        const noShops = <Container></Container>;

        if (errorLoad) {
            return <div>Error: {errorLoad.message}</div>;
        } if (loading) {
            return <div style={{ marginTop: '100px' }}>
            <Spinner type="grow" color="primary" />
            <Spinner type="grow" color="secondary" />
            <Spinner type="grow" color="success" />
            <Spinner type="grow" color="danger" />
            <Spinner type="grow" color="warning" />
            <Spinner type="grow" color="info" />
            <Spinner type="grow" color="light" />
            <Spinner type="grow" color="dark" />
          </div>;
        } if (!loading) {
            return (
                <>
                    <ProductsListContext.Provider value={products}>
                        <div className='row justify-content-center' style={{ marginTop: '40px' }}>
                            <h4>Searched by {searchBy}</h4>
                        </div>
                        <Container style={{ marginTop: '40px', width: '800px', height: '400px' }}>
                            <div className='row justify-content-center' style={{ marginTop: '40px' }}>
                                <h2>Get Inspired</h2>
                            </div>
                            <HorizontalImages></HorizontalImages>
                        </Container>
                        <Container>
                            <Row style={{ marginTop: '100px' }}>
                                <Col><h2>Search results for {search}</h2></Col>
                            </Row>
                            <Row>
                                <ProductsList addToCart={this.addToCart} ></ProductsList>
                            </Row>
                        </Container>
                    </ProductsListContext.Provider>
                    <ShopsListContext.Provider value={shops}>
                        {withShops === true ? yesShops : noShops}
                    </ShopsListContext.Provider>
                </>
            )
        }
    }
}

export default withRouter(SearchResults)

