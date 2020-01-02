import React, { Component } from 'react'
import Modal from 'react-modal';
import { ModalContent, ModalBody, ModalTitle } from '../Modal.styles.js';


class EducationModal extends Component {
  constructor() {
    super();
    
		this.state = {
			modalIsOpen: false,
		};

		this.openModal = this.openModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	}

	openModal() {
		this.setState({ modalIsOpen: true });
	}

	closeModal() {
		this.setState({ modalIsOpen: false });
	}
  
  render() {
    this.state.modalIsOpen = this.props.open;
    // this.setState({ modelIsOpen: true });
    // this.setState({ modalIsOpen });


    return (
      <Modal 
        className="bg-modal" 
        isOpen={this.state.modalIsOpen} 
        onRequestClose={this.closeModal}
        // gets rid of ERR: 'Please use `Modal.setAppElement(el)` or set `appElement={el}` 
        appElement={document.getElementById('root')}
      > 
        <ModalContent>
          <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
          <br />
          <ModalTitle>Educational Resources</ModalTitle>
          <br />
          <ModalBody>
            <a href="https://www.youtube.com/watch?v=L-Qhv8kLESY'">1. What is Bitcoin?</a>
          </ModalBody>
          <h4>
            <a href="https://www.youtube.com/watch?v=lWnAr0vX3sg">2. How to play Bingo</a>
          </h4>
        </ModalContent>
      </Modal>
    )
  }
}

export default EducationModal;