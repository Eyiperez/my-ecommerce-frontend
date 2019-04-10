import React from 'react';
import { withRouter } from 'react-router-dom';
import { Container } from 'reactstrap';


class ShopOrders extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shopID: null

        }
    }
    componentDidMount() {
        const shopID = this.props.match.params.id;
        this.setState({ shopID: shopID});
    }



    render() {

        const { shopID } = this.state;

        return (
            <>
                <Container style={{ marginTop: '40px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h1>Orders for shop ID # {shopID}</h1>
                       
                    </div>
                </Container>
            </>

        )
    }

}

export default withRouter(ShopOrders);