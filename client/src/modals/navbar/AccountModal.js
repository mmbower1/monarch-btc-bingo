import React, { Component } from "react";
import Modal from "react-modal";
import axios from "axios";
import {getCurrentProfile} from '../../actions/profile';

class AccountModal extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      btcAddress: "",
      phone: "",
      password: "",
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
    },this.checkFields);
  };

  onSubmit(event){
      event.preventDefault();
      let id = getCurrentProfile;
      console.log("id: " + id);
      axios.put('/api/users/5df049aab5787023f34e00f7', {
      name: this.state.name
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
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

          <form className="edit-form" onSubmit={this.onSubmit}>
            {/* <form className="edit-form" onSubmit={e => onSubmit(e)}> */}
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
                <div className="edit-email">
                  <input
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={e => {
                      this.handleChange(e);  
                    }}
                  />
                </div>
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

export default AccountModal;