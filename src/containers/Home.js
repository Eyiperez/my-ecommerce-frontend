import React from 'react';
import { withRouter } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
         
        }
    }
    componentDidMount = () => {
        //const currentPage = this.props.location.pathname


    }

    render() {
        return (
            <>
                <div>
                    <h1>IN HOME!</h1>
                </div>


            </>
        )
    }

}

export default withRouter(Home);