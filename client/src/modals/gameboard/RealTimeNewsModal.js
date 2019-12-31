import React, { Component } from 'react';
import Modal from 'react-modal';

class RealTimeNewsModal extends Component  {
  constructor() {
    super();
    
		this.state = {
      modalIsOpen: false,
      loading: true,
      items: [],
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

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(json => {
        this.setState({ loading: false, items: json })
      })
      this.setState({})
  }

  render() {
    var { loading, items } = this.state;

    this.state.modalIsOpen = this.props.open;
    // this.setState({ modalIsOpen: true });
    return (
      <Modal className="bg-modal" isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} appElement={document.getElementById('root')}> 
        <div className="modal-content">
          {/* {this.state.modalIsOpen ? this.props.onRequestClose : this.props.isOpen} */}
          <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
          <br />
          <h3>Real Time News</h3>
          <br />
            {items.map(item => (
              <h4 key={item.id}>
                NAME: {item.name},&nbsp;&nbsp; CITY: {item.address.city}
              </h4>
            ))};
        </div>
      </Modal>
    )
  }
}


export default RealTimeNewsModal
