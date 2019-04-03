import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CartList } from './CartList';
import Storage from '../services/storage';


class CartModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            cartItems: [],
            total: 0
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    componentDidMount() {
        Storage.getData()
            .then(localdata => {
                if (localdata !== null && localdata.length !== this.state.cartItems.length) {
                    this.setState({ cartItems: localdata });
                } else {
                    // handle empty string
                    this.setState({ cartItems: [] });
                }
            })
            .then(() => {
                if (this.state.cartItems !== []) {
                    return this.getTotal(this.state.cartItems)
                } else {
                    return 0
                }
            })
            .then(total => {
                this.setState({ total: total });
            })
    }

    getTotal = (cartItems) => {
        return (cartItems).reduce((acc, cur) => {
            const sum = (acc + cur.price)
            return sum
        }, 0)
    }

    componentDidUpdate() {
        Storage.getData()
            .then(localdata => {
                const cartdata = localdata;
                if ((localdata !== null) && (localdata.length !== this.state.cartItems.length)) {
                    const total = this.getTotal(cartdata)
                    this.setState({ cartItems: cartdata, total: total });
                }
            })
    }

    deleteItem = (index) => {
        const currentCartItems = this.state.cartItems;
        const newItems = [...currentCartItems]
        newItems.splice(index, 1);
        Storage.saveData('cartItems', (newItems))
            .then(() => {
                this.setState({ cartItems: newItems })
            })
            .then(() => {
                return this.getTotal(this.state.cartItems)
            })
            .then(total => {
                this.setState({ total: total });
            })
    }

    render() {
        const { total, cartItems, modal } = this.state;
        const title = 'Items';

        return <div>
            <Button color="white" onClick={this.toggle}>{this.props.buttonLabel} CART </Button>
            <Modal isOpen={modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Your Cart</ModalHeader>
                <ModalBody>
                    <h4>{title} List</h4>
                    <CartList cartItems={cartItems} deleteItem={this.deleteItem} />
                    <div style={{ textAlign: 'right', marginTop: '25px' }}><h4>Your total: ${total}</h4></div>
                </ModalBody>
                <ModalFooter>
                    <Button color="pink" onClick={this.toggle}>Checkout</Button>{' '}
                    <Button color="white" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }

}

export default CartModal;
