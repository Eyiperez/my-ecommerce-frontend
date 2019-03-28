import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import './NavBar.css'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
    }

    handleSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/results/${this.state.query}`);

    }

    setQuery = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/"><div className="">Home</div><span className="sr-only">(current)</span></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/Login"><div className="gradientText">Loggin</div></Link>
                            </li>
                        </ul>
                        <button type="button" className="gradientTex">Secondary</button>
                    </div>
                </nav>


            </>
        )
    }

}

export default withRouter(NavBar);