import React, { Component } from "react";
import Modal from "react-modal";
// import axios from "axios";

class AccountModal extends Component {
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

  // componentDidMount() {
  //   fetch('/api/users')
  //     .then(res => res.json())
  //     .then(json => {
  //       this.setState({ loading: false, items: json })
  //       console.log('subscribe: ', json);
  //     })
  //   }


  render() {
    this.state.modalIsOpen = this.props.open;
    // this.setState({ modelIsOpen: true });
    // this.setState({ modalIsOpen });
    var { loading, items } = this.state;

    return (
      <Modal
        className="bg-modal"
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        // gets rid of ERR: 'Please use `Modal.setAppElement(el)` or set `appElement={el}`
        appElement={document.getElementById("root")}
      >
        <div className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>
            +
          </div>
          Account
          <br />
          <br />
          {this.state.items}
            {/* {items.map(item => (
              <li key={item.id}>
                NAME: {item}
              </li>
            ))} */}
        </div>
      </Modal>
    );
  }
}

export default AccountModal;