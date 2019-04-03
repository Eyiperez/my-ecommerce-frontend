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
            }
            )
            .then(() => {
                if (this.state.cartItems !== []) {
                    return (this.state.cartItems).reduce((acc, curr) => {
                        const sum = (acc + curr.price)
                        return sum
                    }, 0)
                } else {
                    return 0
                }

            })
            .then(total => {
                this.setState({ total: total });
            })
        // window.addEventListener(
        //     "beforeunload",
        //     this.saveStateToData.bind(this)
        // );
    }

    // componentWillUnmount() {
    //     window.removeEventListener(
    //         "beforeunload",
    //         this.saveStateToData.bind(this)
    //     );
    //     // saves if component has a chance to unmount
    //     this.saveStateToData(this.state.cartItems)

    // }

    componentDidUpdate() {
        Storage.getData()
            .then(localdata => {
                console.log('update', localdata)
                const cartdata = localdata;
                if ((localdata !== null) && (localdata.length !== this.state.cartItems.length)) {
                    const total = (cartdata).reduce((acc, cur) => {
                        const sum = (acc + cur.price)
                        return sum
                    }, 0)
                    this.setState({ cartItems: cartdata, total: total });
                }
            })

    }

    saveStateToData = () => {
        // save to localStorage
        Storage.saveData('cartItems', (this.state.cartItems))
            .then(result => {
                console.log('cartItems', result)
            })
    }

    deleteItem = (index) => {
        const currentCartItems = this.state.cartItems;
        const newItems = [...currentCartItems]
        newItems.splice(index, 1);
        console.log('new items', newItems)
        Storage.saveData('cartItems', (newItems))
            .then((result) => {
                this.setState({ cartItems: newItems })
                console.log(result)
            })
            .then(() => {
                return (this.state.cartItems).reduce((acc, curr) => {
                    const sum = (acc + curr.price)
                    return sum
                }, 0)
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
