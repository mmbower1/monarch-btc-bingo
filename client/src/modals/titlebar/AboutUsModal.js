import React, { Component } from 'react';
import Modal from 'react-modal';

class AboutUsModal extends Component  {
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
    // this.setState({ modalIsOpen });
    
    return (
      <Modal 
        className="bg-modal" 
        isOpen={this.state.modalIsOpen} 
        onRequestClose={this.closeModal}
        // gets rid of console ERR: 'Please use `Modal.setAppElement(el)` or set `appElement={el}` 
        appElement={document.getElementById('root')}
      > 
        <div className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
          About Us
          <br />
          <br />
          <h3>Monarch Wallet is a universal decentralized cryptocurrency wallet that allows you to buy/sell crypto,
            uses one KYC for all services, gain interest on crypto through interest, and provides all necessary crypto sources to stay updated.
            We are the first wallet to be decentralized wallet while gaining interest on assets. Not your keys, not your crypto!
          </h3>
        </div>
        
      </Modal>
    )
  }
}

export default AboutUsModal
