import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../../actions/profile';
import Modal from "react-modal";

class ProfileModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      items: [],
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

  componentWillMount() {
    this.props.getCurrentProfile()
  }

  render() {
    this.state.modalIsOpen = this.props.open;
    // this.setState({ modelIsOpen: true });
    // this.setState({ modalIsOpen });
    var { items } = this.state;
    console.log('items', items);
    // const profileItems = this.props.items.map(item =>
    //   <div key={item.id}>
    //       <h3>{item.name}</h3>
    //   </div>
    // );

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
            <li>Name: {'Matt Bower'}<button type="button" className="btn"> Edit</button></li>
            <li>Email: {'mttbwr91@gmail'}<button type="button" className="btn"> Edit</button></li>
            <li>Btc Address: {'1yfdf34t43f3fdfgdsfff4w3fswdfsd'}</li>
            <li>Phone: {'(530)219-1250'}<button type="button" className="btn"> Edit</button></li>
            <li>Password: {'******'}<button type="button" className="btn"> Edit</button></li>
          </ul>
          {items}
        </div>
      </Modal>
    );
  }
}

ProfileModal.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    items: state.getCurrentProfile
})

export default connect(mapStateToProps, { getCurrentProfile })(ProfileModal);
