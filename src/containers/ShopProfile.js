import React from 'react';
import { withRouter } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:'',
            image:'',
            description:'',
            sellerName:'',
            sellerEmail:'',
            products:'',
            id: null,    
        }
    }
    componentDidMount = () => {
        console.log(this.props.match.params.name)
        console.log(this.props.match.params.id)
    }

    render() {
        return (
            <>
                <div>
                    <h1>IN SHOP!</h1>
                </div>


            </>
        )
    }

}

export default withRouter(Home);