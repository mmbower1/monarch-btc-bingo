import React, { Component } from 'react';
import Modal from 'react-modal';

class BingoExplainedModal extends Component  {
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
          Bingo Explained
          <br />
          <br />
          <h3>1. Confirm you are over 18 years old. <br /><br />2. Register a new account on the homescreen with all appropriate info.
              <br /><br /> 3. Bingo numbers are generated 1-75 once a day randomly on a timer, so check everyday if your number matched! Once you 
              gain a whole row of numbers (up, down, diagonal) your winning time will be auto recorded so we know who wins at what
              exact time.<br /><br /> 4. Goodluck!
          </h3>
        </div>
      </Modal>
    )
  }
}

export default BingoExplainedModal