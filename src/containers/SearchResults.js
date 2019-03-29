import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
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
                "image": "https://source.unsplash.com/random/80x80",
                "description": "yellow, air",
                "category": "birthday",
                "color": "yellow",
                "likes": null,
                "shop_name": "Balloon Shop"
            },{
                "id": 1,
                "shop_id": 1,
                "name": "Big balloon",
                "price": 3,
                "image": "https://source.unsplash.com/random/80x80",
                "description": "giant balloon, pink, helium",
                "category": "babyshower",
                "color": "pink",
                "likes": null,
                "shop_name": "Balloon Shop"
            }],
            search:'',
            searchBY:''
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
    componentDidMount = () => {
        console.log(this.props.match.params.query)
        console.log(this.props.match.params.cat)
        this.setState({ search: this.props.match.params.query})
        this.setState({ searchBy: this.props.match.params.cat})
    }

    componentWillMount(props) {
        // this.requestSearch(props.match.params.query)
        console.log(this.props.match.params.query)
        console.log(this.props.match.params.cat)
        this.setState({ search: this.props.match.params.query})
        this.setState({ searchBY: this.props.match.params.cat})
    }

    // renderList = () => {
    //     return ( 
    //         this.state.videoData.map((e,i)=>{
    //             return <VideoCardSearch key={i} video={e}/>
    //         })
    //     )
    // }
    render() {
const {search, searchBy} = this.state

        return (
            <>
                <div className='row justify-content-center'>
                    <h4>Search by {searchBy}</h4>
                </div>
                <Container>
        <Row>
          <Col><h2>Search results for {search}</h2></Col>
        </Row>
        <Row>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
          <Col>.col</Col>
        </Row>
      </Container>
            </>
        )
    }
}

export default withRouter(SearchResults)

