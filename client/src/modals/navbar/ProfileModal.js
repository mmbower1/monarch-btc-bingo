import React, { Component } from "react";
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { ModalContent, ModalBody, ModalTitle } from '../Modal.styles.js';
// import { getCurrentProfile } from '../../actions/profile';
import Modal from "react-modal";
import axios from 'axios';

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      btcAddress : "",
      phoneNumber : "",
      password : "",
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // if (this.props.open == true) {
    //   this.state.modalIsOpen = true
    // }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  // this function can be replaced into a redux 'updateUser' action
  componentDidCatch = () => {
    const { auth } = this.props;
    axios.get(`/api/users/${auth.user._id}`)
    .then(res => {
      console.log('res: ' + JSON.stringify(res));
      this.setState({
        name: auth.user.name,
        btcAddress : "",
        phone : "",
        password : "",
      });
      // close modal
      this.props.onClose();
      // set alert
      this.props.setAlert('Account Updated!', 'success');
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { open } = this.props;
    this.state.modalIsOpen = open;
    // this.setState({ modalIsOpen: true });
    // this.setState({ modalIsOpen });

    return (
      <Modal
        className="bg-modal"
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        // gets rid of ERR: 'Please use `Modal.setAppElement(el)` or set `appElement={el}`
        appElement={document.getElementById("root")}
      >
        <ModalContent>
          <div className="close-modal" onClick={() => this.props.onClose()}>
            +
          </div>
          <br />
          <ModalTitle>Profile</ModalTitle>
          <br />
          <ModalBody>
            <h4>Name:</h4>
            <h4>Email:</h4>
            <h4>Btc Address:</h4>
            <h4>Phone:</h4>
            <h4>Password: {'hi'}</h4>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
}

// needs to be exported as same name (auth) from the root reducer
const mapStateToProps = (state) => {
  // console.log('state.auth profile: ', state.auth);
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(ProfileModal);
