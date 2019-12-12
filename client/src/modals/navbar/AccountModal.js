import React, { Component } from "react";
import { connect } from 'react-redux';
import Modal from "react-modal";
import axios from "axios";
import * as auth from '../../actions/auth';

class AccountModal extends Component {
  constructor() {
    super();
    this.state = {
      name : "",
      btcAddress : "",
      phone : "",
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
    console.log("handleChange: " + e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    }, this.checkFields);
  };

  onSubmit(e) {
    e.preventDefault();
    const { auth } = this.props;
    // let updateUser;
    // console.log("updateUser: " + updateUser);
    axios.put(`/api/users/${auth.user}`, {
      name: this.state.name,
      btcAddress: this.state.btcAddress,
      phone: this.state.phone,
      password: this.state.password
    })
    .then(res => {
      console.log('res: ' + JSON.stringify(res));
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    const { auth } = this.props;
    console.log('auth.user account: ', auth.user);

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
        <div className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>
            +
          </div>
          Account
          <br />
          <br />
          <form className="edit-form" onSubmit={this.onSubmit}>
            <div className="edit-div">
              <div className="form-group">
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
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
              <div className="edit-btcAddress">
                <input
                  name='btcAddress'
                  type='text'
                  placeholder='Btc address'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div >
              <div className="edit-phone">
                <input
                  name='phone'
                  type='text'
                  placeholder='Phone'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
              <div className="edit-password">
                <input
                  name='password'
                  type='text'
                  placeholder='Password'
                  onChange={e => {
                    this.handleChange(e);
                  }}
                />
              </div>
            </div>
            <input type='submit' value='Submit'></input>
          </form>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('state.auth: ', state.auth);
  return {
    // auth needs to have same name as whats being exported from root reducer!
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch) => {
  console.log("dispatch: ", dispatch)
  return {
    updateUser: (id) => { dispatch({ type: 'UPDATE_ACCOUNT', id: id }) }
  }
}

export default connect(mapStateToProps, {mapDispatchToProps})(AccountModal);