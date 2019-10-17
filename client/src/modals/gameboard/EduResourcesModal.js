import React, { Component } from 'react'
import Modal from 'react-modal';

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
        <div className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
          Educational Resources
          <br />
          <br />
          <li>
            <a href="https://www.youtube.com/watch?v=L-Qhv8kLESY'">1. What is Bitcoin?</a>
          </li>
          <li>
            <a href="https://www.youtube.com/watch?v=lWnAr0vX3sg">2. How to play Bingo</a>
          </li>
        </div>
      </Modal>
    )
  }
}

export default EducationModal;