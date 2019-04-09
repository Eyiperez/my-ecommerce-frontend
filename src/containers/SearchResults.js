import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { ProductsList } from '../components/ProductsList';
import ProductsListContext from '../contexts/ProductsList';
import ShopsListContext from '../contexts/ShopsList';
import Storage from '../services/storage';
import HorizontalImages from '../components/horizontalImages';
import { ShopsList } from '../components/ShopList';
import Requests from '../services/Requests';
//import axios from 'axios'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            withProducts: true,
            search: '',
            searchBy: '',
            location: this.props.location.pathname,
            cartItems: [],
            loading: false,
            errorLoad: null,
            withShops: true,
            shops: []
        }
    }

    componentDidMount() {
        const search = this.props.match.params.query;
        const searchBy = this.props.match.params.cat;
        console.log(searchBy)
        Storage.getData()
            .then(localdata => {
                if (localdata !== null) {
                    this.setState({
                        cartItems: localdata,
                        search: search,
                        searchBy: searchBy
                    });
                } else {
                    // handle empty string
                    this.setState({
                        cartItems: [],
                        search: search,
                        searchBy: searchBy
                    });
                }
            })
            .then(() => {
                if (searchBy === 'name') {
                    return Promise.all([Requests.productsByName(search), Requests.shopsByName(search)])
                }
                if (searchBy === 'color') {
                    return Promise.all([Requests.productsByColor(search), Requests.shopsByName(search)])
                }
                if (searchBy === 'description') {
                    return Promise.all([Requests.productsByDescription(search), Requests.shopsByName(search)])
                }
                if (searchBy === 'event type') {

                    return Promise.all([Requests.productsByCategory(search), Requests.shopsByName(search)])
                }
            },
            (errorLoad) => {
                this.setState({
                    loading: true,
                    errorLoad
                });
            })
            .then((values) => {
                console.log(values)
                const products = values[0].data;
                const shops = values[1].data;

                if (products.length === 0) {
                    this.setState({ withProducts: false, shops: shops })
                } else {
                    this.setState({ products: products, shops: shops })
                }
            })
    }

    componentWillUnmount() {
        window.removeEventListener(
            "beforeunload",
            this.saveStateToData.bind(this)
        );
    }

    componentDidUpdate(prevProps) {
        const search = this.props.match.params.query;
        const searchBy = this.props.match.params.cat;
        if (this.props.location !== prevProps.location) {
            if (searchBy === 'name') {
                return Promise.all([Requests.productsByName(search), Requests.shopsByName(search)])
                    .then((values) => {
                        console.log(values)
                        const products = values[0].data;
                        const shops = values[1].data;

                        if (products.length === 0) {
                            this.setState({ withProducts: false, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        } else {
                            this.setState({ products: products, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        }
                    })
            }
            if (searchBy === 'color') {
                return Promise.all([Requests.productsByColor(search), Requests.shopsByName(search)])
                    .then((values) => {
                        console.log(values)
                        const products = values[0].data;
                        const shops = values[1].data;

                        if (products.length === 0) {
                            this.setState({ withProducts: false, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        } else {
                            this.setState({ products: products, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        }
                    })
            }
            if (searchBy === 'description') {
                return Promise.all([Requests.productsByDescription(search), Requests.shopsByName(search)])
                    .then((values) => {
                        console.log(values)
                        const products = values[0].data;
                        const shops = values[1].data;

                        if (products.length === 0) {
                            this.setState({ withProducts: false, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        } else {
                            this.setState({ products: products, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        }
                    })
            }
            if (searchBy === 'event type') {
                return Promise.all([Requests.productsByCategory(search), Requests.shopsByName(search)])
                    .then((values) => {
                        console.log(values)
                        const products = values[0].data;
                        const shops = values[1].data;

                        if (products.length === 0) {
                            this.setState({ withProducts: false, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        } else {
                            this.setState({ products: products, shops: shops, search: search, searchBy: searchBy, alertOn: false })
                        }
                    })
            }

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
                <Spinner type="grow" color="secondary" />
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

