import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";

class ProfileModal extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      items: []
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

  async componentDidMount() {
    await axios.get('http://localhost:5000/api/users', { headers: { 'crossDomain': true, 'Content-Type': 'application/json' } })
      .then(res => res.json())
      .then(json => this.setState({ items: json }))
  }

  render() {
    this.state.modalIsOpen = this.props.open;
    // this.setState({ modelIsOpen: true });
    // this.setState({ modalIsOpen });
    var { items } = this.state;
    console.log(items);

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
          Profile
          <br />
          <br />
          {this.state.items.map(item => (
              <li key={item.id}>
                {item}
              </li>
            ))};
        </div>
      </Modal>
    );
  }
}

export default ProfileModal;
