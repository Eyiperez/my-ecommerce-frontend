import React from 'react';
import { withRouter } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'home',
        }
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