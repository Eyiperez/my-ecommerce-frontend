import React from 'react';
import { withRouter } from 'react-router-dom';
import NavsContext from '../contexts/Navs';


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'Login',
        }
    }

    componentDidMount = () => {
        console.log(this.props.location.pathname)
        this.setState({ page: 'Login' })
        // const currentPage = this.props.location.pathname
        // if (currentPage === '/Login') {
        //     this.setState = ({ page: 'Login' })
        // }
        // if (currentPage === '/') {
        //     this.setState = ({ page: 'Home' })
        // }
        // if (currentPage === '/Register') {
        //     this.setState = ({ page: 'Register' })
        // }

    }
    render() {
        return (
            <NavsContext.Provider value={this.state.page}>
                <div>
                    <h1>IN LOGIN!</h1>
                </div>
            </NavsContext.Provider>

        )
    }

}

export default withRouter(Login);