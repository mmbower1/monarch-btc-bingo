import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
    this.props = props
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  componentDidMount() {
    const { auth } = this.props;
    // axios.get(`/api/users/${auth.user._id}`)
    // .then(res => {
    //   console.log('res: ' + JSON.stringify(res));
    //   this.setState({
    //     name: auth.user.name,
    //     btcAddress : "",
    //     phone : "",
    //     password : "",
    //   });
    //   // close modal
    //   this.props.onClose();
    //   // set alert
    //   this.props.setAlert('Account Updated!', 'success');
    // })
    // .catch(err => {
    //   console.log(err);
    // });
    console.log('this.state profile: ', this.state.name);
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
        <div className="modal-content">
          <div className="close-modal" onClick={() => this.props.onClose()}>
            +
          </div>
          <br />
          <h3>Profile</h3>
          <br />
            <h4>Name: {this.props.auth}</h4>
            {console.log('this.state ', this.state)}
            <h4>Email: {'mttbwr91@gmail'}</h4>
            <h4>Btc Address: {'1yfdf34t43f3fdfgdsfff4w3fswdfsd'}</h4>
            <h4>Phone: {'(530)219-1250'}</h4>
            <h4>Password: {'******'}</h4>
        </div>
      </Modal>
    );
  }
}

// needs to be exported as same name (auth) from the root reducer
const mapStateToProps = (state) => {
  console.log('state.auth profile: ', state.auth);
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(ProfileModal);
