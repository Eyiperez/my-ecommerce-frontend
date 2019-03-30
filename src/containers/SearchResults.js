import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { ProductsList } from '../components/ProductsList';
import ProductsListContext from '../contexts/ProductsList';
//import axios from 'axios'

class SearchResults extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [{
                "id": 2,
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
                "id": 1,
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
                "id": 2,
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
                "id": 1,
                "shop_id": 1,
                "name": "Big balloon",
                "price": 3,
                "image": "https://source.unsplash.com/random/200x200",
                "description": "giant balloon, pink, helium",
                "category": "babyshower",
                "color": "pink",
                "likes": null,
                "shop_name": "Balloon Shop"
            },{
                "id": 2,
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
                "id": 1,
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
            location: this.props.location.pathname
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
        this.setState({ search: this.props.match.params.query })
        this.setState({ searchBy: this.props.match.params.cat })
    }

    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            this.setState({ search: this.props.match.params.query,searchBy: this.props.match.params.cat, alertOn: false })
        }
    }

    renderSearchList = () => {

    }

    render() {
        const { search, searchBy } = this.state

        return (
            <ProductsListContext.Provider value={this.state.products}>
                <div className='row justify-content-center' style={{marginTop: '40px'}}>
                    <h4>Searched by {searchBy}</h4>
                </div>
                <Container>
                    <Row style={{marginTop: '40px'}}>
                        <Col><h2>Search results for {search}</h2></Col>
                    </Row>
                    <Row>
                        <ProductsList></ProductsList>
                    </Row>
                </Container>
            </ProductsListContext.Provider>
        )
    }
}

export default withRouter(SearchResults)

