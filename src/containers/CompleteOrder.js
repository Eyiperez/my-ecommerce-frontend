import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';


class CompleteOrder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            orderNumber: null

        }
    }
    componentDidMount() {
        const orderNumber = this.props.match.params.id;
        this.setState({ orderNumber: orderNumber });
    }



    render() {

        const { orderNumber } = this.state;

        return (
            <>
                <Container style={{ marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Your order # {orderNumber} was submitted! </h1>
                        <h3>Thank you!</h3>
                    </div>
                </Container>
            </>

        )
    }

}

export default withRouter(CompleteOrder);