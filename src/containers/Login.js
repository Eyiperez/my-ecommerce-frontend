import React from 'react';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'login',
        }
    }

    render() {
        return (
            <>
                <div>
                    <h1>IN LOGIN!</h1>
                </div>


            </>
        )
    }

}

export default withRouter(Login);