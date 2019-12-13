import React, { Component } from 'react'
import Modal from 'react-modal';

class OurMissionModal extends Component {
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
          <h3>Our Mission</h3>
          <br />
          <h4>Our mission is to use the most widely played games to help folks get accustomed to crypto. We know it 
            can be a daunting and crowded space, but we got you covered! At Bingo on the Blockchain we aim to be more 
            than a lottery site or another crypto startup. Our goal is to show people how seamless it is to earn crypto 
            by simply playing Bingo.
          </h4>
        </div>
      </Modal>
    )
  }
}

export default OurMissionModal;
