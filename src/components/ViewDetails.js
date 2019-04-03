import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductDetail from './ProductDetail';
//import Storage from '../services/storage';

class ViewDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      recentlyViewed: []
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
        <Button color="gray" onClick={this.toggle} >{this.props.buttonLabel}See deatils</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>{this.props.productInfo.name}</ModalHeader>
          <ModalBody>
            <ProductDetail product={this.props.productInfo} onClick={this.addToRecentlyViewed}></ProductDetail>
          </ModalBody>
          <ModalFooter>
            <Button color="gary" onClick={this.toggle}>I like it!</Button>{' '}
            <Button color="gray" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ViewDetailsModal;