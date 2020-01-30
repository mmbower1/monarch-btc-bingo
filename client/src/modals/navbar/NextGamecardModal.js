import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ModalContent, ModalBody, ModalTitle, NextGameCardShuffle } from '../Modal.styles.js';
import Modal from 'react-modal';
import axios from 'axios';
// import generateCardNumbers from '../../../../helpers/generateCardNumbers'

export class NextGamecardModal extends Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false,
            suffleCards: false
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

    shuffleCards = () => {
        const { auth } = this.props;
        this.setState({ suffleCards: true });
        axios.put(`/api/users/${auth.user._id}`)
            .then(() => this.setState({
                shuffleCards: true,
            }),
            //generateCardNumbers()
        ).catch(err => console.error(err))
        // console.log('nextGameCardClick: ', nextGameCardClick);
        this.props.onClose();
        console.log("CARDS SHUFFLED!");
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
                    <ModalTitle>Next Gamecard</ModalTitle>
                    <br />
                    <ModalBody>Are you sure you would you like to shuffle your gamecard numbers before the next game starts?</ModalBody>
                    <br />
                    <NextGameCardShuffle onClick={() => this.shuffleCards()}>CONFIRM</NextGameCardShuffle>
                </ModalContent>
            </Modal>
        )
    }
}

// needs to be exported as same name (auth) from the root reducer
const mapStateToProps = (state) => {
    return {
      auth: state.auth
    }
  }

export default connect(mapStateToProps)(NextGamecardModal)
