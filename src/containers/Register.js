import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from '../firebase';
import axios from 'axios';



class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'Register',
            email: '',
            name: '',
            shopName: '',
            shopDescrition: '',
            imageURL: '',
            error: '',
            newSeller: {},
            newShop: {},
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((response) => {
                console.log('Returns: ', response.user.uid);
                const newSeller = {
                    name: this.state.name,
                    email: this.state.email,
                    seller_id: response.user.uid,
                    seller_photo: this.state.imageURL
                }
                return newSeller;
            })
            .then((newSeller) => {
                return axios.post('http://localhost:3084/seller/', newSeller)
            })
            .then((res) => {
                console.log(res.data.success)
                console.log(res.data.id)
                const newShop = {
                    name: this.state.shopName,
                    owner: res.data.id,
                    description: this.state.shopDescription
                }
                return newShop;
            })
            .then((newShop) => {
                return axios.post('http://localhost:3084/shop/', newShop)
            })
            .then((res) => {
                console.log(res.data.success)
                console.log(res.data.id)
                this.props.history.push(`/ShopProfile/${this.state.shopName}/${res.data.id}`)
            })
            .catch(err => {
                const { message } = err;
                this.setState({ error: message });
            })
    }


    handleFileInput = async (e) => {
        const firstFile = e.target.files[0];
        console.log(firstFile)

        const root = firebase.storage().ref()
        const newImage = root.child(firstFile.name);

        try {
            const snapshot = await newImage.put(firstFile);
            const url = await snapshot.ref.getDownloadURL();
            console.log(url)
            this.setState({ imageURL: url })
        }
        catch (err) {
            console.log(err);
        }

    }

    goToLogin= () =>{
        this.props.history.push(`/Login`)       
}


    render() {
        const { email, password, name, shopName, description, error } = this.state;
        const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

        return (
            <Container style={{ marginTop: '80px' }}>
                <div>
                    <h1>Sing in, become a seller at festive!</h1>
                    {displayError}
                </div>
                <Container style={{ marginTop: '40px' }}>
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleEmail">Email</Label>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="email" value={email} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="examplePassword">Password</Label>
                                    <Input type="password" name="password" id="examplePassword" placeholder="password" value={password} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="exampleName">Name</Label>
                            <Input type="text" name="name" id="exampleName" placeholder="John" value={name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleFile" sm={2}>Your Image</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="exampleFile" onChange={this.handleFileInput} />
                                <FormText color="muted">
                                    This image will be displayed as your shop profile picture.
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Label>Your Shop Name</Label>
                            <Input type="text" name="shopName" id="exampleShopname" placeholder="Ballon Shop" value={shopName} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Shop Description</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="shopDescription" id="exampleText" value={description} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} style={{backgroundColor:'#f9498e', borderColor:'#f9498e', color:'white'}}>Sign Up</Button>
                        <Button onClick={this.goToLogin} style={{backgroundColor:'white', borderColor:'#f9498e', marginLeft:'20px', color:'black'}}>Already a seller</Button>
                    </Form>
                </Container>
            </Container>
        )
    }

}

export default withRouter(Register);