import React from 'react';
import { withRouter } from 'react-router-dom';


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'home',
        }
    }
    componentDidMount = () => {
        console.log(this.props.location.pathname)
        const currentPage = this.props.location.pathname
        if (currentPage === '/Login') {
            this.setState = ({ page: 'Login' })
        }
        if (currentPage === '/') {
            this.setState = ({ page: 'Home' })
        }
        if (currentPage === '/Register') {
            this.setState = ({ page: 'Register' })
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