import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProductDetail from './ProductDetail';
import Storage from '../services/storage';


class ViewDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      recentlyViewed: []
    };

    this.toggle = this.toggle.bind(this);
  }

  //add to local storage as recently viewed items
  componentDidUpdate() {
    Storage.getRecentlyViewed('recentlyViewed')
      .then((localData) => {
        let alreadyAdded = false
        if (localData !== null) {
          for (let i = 0; i < localData.length; i++) {
            if (localData[i].id === this.props.productInfo.id) {
              alreadyAdded = true
              return localData
            }
          }
        }
        if (alreadyAdded === false && localData !== null) {
          const updatedViewed = localData
          updatedViewed.push(this.props.productInfo)
          return updatedViewed
        }
        if (localData === null) {
          const newViewed = []
          newViewed.push(this.props.productInfo)
          return newViewed
        }
      })
      .then((viewed) => {
        Storage.saveData('recentlyViewed', viewed)
      })
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