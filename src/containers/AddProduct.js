import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Col, Row, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import firebase from '../firebase';
import axios from 'axios';




class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 'AddProduct',
            shopName: '',
            name: '',
            shop_id: '',
            description: '',
            image: '',
            price: '',
            category: '',
            color: '',
            error: '',
            newProduct: {},
        }
    }

    componentDidMount() {
        const shopID = this.props.match.params.id;
        const shopName = this.props.match.params.name;
        console.log(shopID)
        console.log(shopName)
        this.setState({ shop_id: shopID, shopName: shopName });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { name, shop_id, description, image, price, category, color } = this.state;
        const newProduct = {
            shop_id: shop_id,
            name: name,
            price: price,
            image: image,
            description: description,
            category: category,
            color: color,
            likes: 0
        }
        axios.post('http://localhost:3084/product/', newProduct)

            .then((res) => {
                console.log(res.data.id)
                this.setState({ name: '', price: '', description: '', category: '', color: '' })

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
            this.setState({ image: url })
        }
        catch (err) {
            console.log(err);
        }

    }

    doneAdding = () => {
        const { shop_id, shopName } = this.state;
        const shopProfile = `/ShopProfile/${shopName}/${shop_id}`
        this.props.history.push(shopProfile)
    }


    render() {
        const { name, description, price, category, color, error } = this.state;
        const displayError = error === '' ? '' : <div className="alert alert-danger" role="alert">{error}</div>

        return (
            <Container style={{ marginTop: '80px' }}>
                <div>
                    <h1>Add a product</h1>
                    {displayError}
                </div>
                <Container style={{ marginTop: '40px' }}>
                    <Form>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleName">Product's Name</Label>
                                    <Input type="name" name="name" id="exampleName" placeholder="Product's name" value={name} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleCategory">Category</Label>
                                    <Input type="text" name="category" id="exampleCategory" placeholder="category" value={category} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="exampleColor">Product's Color</Label>
                                    <Input type="text" name="color" id="exampleColor" placeholder="Product's Color" value={color} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="examplePrice">Price</Label>
                                    <Input type="text" name="price" id="examplePrice" placeholder="price" value={price} onChange={this.handleChange} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup row>
                            <Label for="exampleFile" sm={2}>Product's Image</Label>
                            <Col sm={10}>
                                <Input type="file" name="file" id="exampleFile" onChange={this.handleFileInput} />
                                <FormText color="muted">
                                </FormText>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="exampleText" sm={2}>Product's Description</Label>
                            <Col sm={10}>
                                <Input type="textarea" name="description" id="exampleText" value={description} onChange={this.handleChange} />
                            </Col>
                        </FormGroup>
                        <Button onClick={this.handleSubmit} style={{ backgroundColor: '#f9498e', borderColor: '#f9498e', color: 'white' }}>Add Product</Button>
                        <Button onClick={this.doneAdding} style={{ backgroundColor: 'white', borderColor: '#f9498e', marginLeft: '20px', color: 'black' }}>Done Adding</Button>
                    </Form>
                </Container>
            </Container>
        )
    }

}

export default withRouter(Register);