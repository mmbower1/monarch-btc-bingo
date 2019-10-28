import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";

class SubscribeModal extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
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
        appElement={document.getElementById("root")}
      >
        <div id="subscription-modal-content" className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>
            +
          </div>
          <h2>Subscribe</h2>
          <h4>Enter email to receive awesome monthly newsletters.</h4>
          <br />
          <form action="api/users/subscribe" method="POST">
            <div id="subscription-form-group" className="form-group">
              <input
                type="text"
                name="firstName"
                id="first-name"
                className="form-control"
                placeholder="First Name"
              />
              <input
                type="text"
                name="lastName"
                id="last-name"
                className="form-control"
                placeholder="Last Name"
              />
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                placeholder="Email"
              />
              <button type="submit" className="btn btn-primary btn-block">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </Modal>
    );
  }
}

export default SubscribeModal;