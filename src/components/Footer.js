import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import {
    FacebookIcon,
    TwitterIcon,
    PinterestIcon,
} from 'react-share';

const Footer = () => {

    return <nav className="navbar navbar-light justify-content-center" style={{ backgroundColor: 'white', marginTop: '100px' }}>
        <Container className="justify-content-center" style={{ marginBottom: '50px' }} >
            <Row className='col-4'>
                <Col>
                    <p className="text-md-left" >Contact Us</p>
                    <p className="text-sm-left" >Email</p>
                    <br></br>
                    <br></br>
                    <br></br>
                </Col>
            </Row>
            <Row className='col-4'>
                <Col >
                    <p className="text-md-center">About</p>
                    <p className="text-md-center">ThisShop, Inc</p>
                    <p className="text-md-center">Polices</p>
                    <br></br>
                    <br></br>
                </Col>
            </Row>
            <Row className='col-4'>
                <Col >
                    <p className="text-center">Follow ThisShop</p>
                    <Row className='row justify-content-center'><FacebookIcon size={32} round={true} className='row justify-content-right' /> <p className="text-right">Facebook</p></Row>
                    <Row className='row justify-content-center'><TwitterIcon size={32} round={true} /> <p className="text-right">Twitter</p></Row>
                    <Row className='row justify-content-center'><PinterestIcon size={32} round={true} /> <p className="text-right">Pinterest</p></Row>
                </Col>
            </Row>
        </Container >
        <Container className='row justify-content-center' >
            <Col >
                <p className="text-md-left">The place to be to create the party to be at!</p>
            </Col>
            <Col>
                <p className="text-right">@ThisShop, Inc</p>

            </Col>
        </Container>

    </nav>
}

export default withRouter(Footer)