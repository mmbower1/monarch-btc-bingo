import React, { Component } from 'react';
import Modal from 'react-modal';

class GameArchivesModal extends Component  {
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
          <br />
          <h3>Game Archives</h3>
          <br />
        </div>
      </Modal>
    )
  }
}

export default GameArchivesModal