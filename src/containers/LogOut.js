import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Button } from 'reactstrap';
import firebase from '../firebase';



class LogOut extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'LogOut',
        }
    }

    logOut= () =>{
        firebase.auth().signOut()
        .then(() =>{
            this.props.history.push(`/`)
        })
    }


    render() {
        return (
            <Container style={{ marginTop: '40px', height: '300px' }}>
                <div style={{ textAlign: 'center' }}>
                    <h1>See you soon!</h1>
                    <Button style={{backgroundColor:'#f9498e', borderColor:'#f9498e'}} size="lg" onClick={this.logOut}>Log Out</Button>{' '}
                </div>
            </Container>
        )
    }

}

export default withRouter(LogOut);