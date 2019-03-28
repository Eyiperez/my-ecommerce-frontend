import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CartList } from './CartList';

class CartModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  render() {
    return (
      <div>
        <Button color="white" onClick={this.toggle}>{this.props.buttonLabel} CART </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Your Cart</ModalHeader>
          <ModalBody>
            <CartList/>
             </ModalBody>
          <ModalFooter>
            <Button color="pink" onClick={this.toggle}>Checkout</Button>{' '}
            <Button color="white" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default CartModal;
