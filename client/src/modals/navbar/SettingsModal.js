import React, { Component } from 'react';
import { ModalContent, ModalBody, ModalTitle } from '../Modal.styles.js';
import Modal from 'react-modal';

export class SettingsModal extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
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


    render() {
        this.state.modalIsOpen = this.props.open;
        return (
            <Modal
                className="bg-modal" 
                isOpen={this.state.modalIsOpen} 
                onRequestClose={this.closeModal}
                // gets rid of ERR: 'Please use `Modal.setAppElement(el)` or set `appElement={el}` 
                appElement={document.getElementById('root')}
            >
                <ModalContent>
                    <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
                    <br />
                    <ModalTitle>Settings</ModalTitle>
                    <br />
                    <ModalBody>Settings</ModalBody>
                </ModalContent>
            </Modal>
        )
    }
}

export default SettingsModal
