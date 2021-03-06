import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModalContent, ModalTitle } from '../Modal.styles.js';
import Modal from "react-modal";
import axios from "axios";
import { setAlert } from "../../actions/alert";
// import { updateUser } from '../../actions/auth';

class AccountModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      btcAddress : "",
      phoneNumber : "",
      password : "",
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    }, this.checkFields);
  };

  // this function can be replaced into a redux 'updateUser' action
  onSubmit = (e) => {
    e.preventDefault();
    const { auth } = this.props;
    // Check which fields have been updated and then submit only those fields
    let userInfo = {}
    if (this.state.name !== ""){
      userInfo.name = this.state.name;
    }
    if (this.state.phone !== ""){
      userInfo.phoneNumber = this.state.phone;
    }
    if (this.state.btcAddress !== ""){
      userInfo.btcAddress = this.state.btcAddress;
    }
     // close modal
    if (this.state.name === '' && this.state.btcAddress === '' && this.state.phone === '') {
      ////////??
    }
    axios.put(`/api/users/${auth.user._id}`, userInfo)
    .then(() => {
      this.setState({
        name: "",
        btcAddress : "",
        phone : "",
      });
      this.props.setAlert('Account updated!', 'success');
      this.props.onClose();
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    this.state.modalIsOpen = this.props.open;

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
          <br />
          <ModalTitle>Edit Account Info</ModalTitle>
          <br />
          <form id="accountModal-edit" className="form" onSubmit={this.onSubmit}>
            <div className="edit-div">
              <div id="" className="form-group">
                <input
                  name='name'
                  type='text'
                  placeholder='Edit Name'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
              {/* <div className="edit-email">
                <input
                  name='email'
                  type='email'
                  placeholder='Email'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div> */}
              <div id="" className="form-group">
                <input
                  name='btcAddress'
                  type='text'
                  placeholder='Edit Btc address'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  minLength='40'
                />
              </div >
              <div id="" className="form-group">
                <input
                  name='phone'
                  type='text'
                  placeholder='Edit Phone'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                  minLength='10'
                />
              </div>
            </div>
            <br />
            <input className="btn-primary" type='submit' value='Submit'></input>
          </form>
        </div>
      </Modal>
    );
  }
}

AccountModal.propTypes = {
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  // console.log('state.auth: ', state.auth);
  return {
    // auth needs to have same name as whats being exported from root reducer!
    auth: state.auth,
  }
}

export default connect(mapStateToProps, { setAlert })(AccountModal);