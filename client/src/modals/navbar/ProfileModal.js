import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { getCurrentProfile } from '../../actions/profile';
import Modal from "react-modal";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  // componentWillMount() {
  //   this.props.getCurrentProfile()
  // }

  render() {
    const { auth } = this.props;
    // console.log('auth.user profile: ', auth.user);

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
          Profile
          <br />
          <br />
          <ul>
            <li>Name: {}</li>
            <li>Email: {'mttbwr91@gmail'}</li>
            <li>Btc Address: {'1yfdf34t43f3fdfgdsfff4w3fswdfsd'}</li>
            <li>Phone: {'(530)219-1250'}</li>
            <li>Password: {'******'}</li>
          </ul>
        </div>
      </Modal>
    );
  }
}

// exported as same name (auth) from the root reducer
const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, {})(ProfileModal);
