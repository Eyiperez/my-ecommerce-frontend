import React from 'react'
import {withRouter} from 'react-router-dom'
//import axios from 'axios'

class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {

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
        // this.requestSearch(this.props.match.params.query)
        console.log(this.props.match.params.query)
        console.log(this.props.match.params.cat)
    
    }

    componentWillReceiveProps(props) {
        // this.requestSearch(props.match.params.query)
        console.log(props.match.params.query)
        console.log(props.match.params.cat)
    }

    // renderList = () => {
    //     return ( 
    //         this.state.videoData.map((e,i)=>{
    //             return <VideoCardSearch key={i} video={e}/>
    //         })
    //     )
    // }
    render () {
        return (
            <>  
                <div className='row justify-content-center'>
                   In Search 
                </div>
            </>
        )
    }
}

export default withRouter(SearchResults)

