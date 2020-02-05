import React, { Component } from 'react'
import Modal from 'react-modal';
import { Controls, ModalContent, ModalBody, ModalTitle, Screen, VideoContainer } from '../Modal.styles.js';


class GamestreamModal extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  //   // play/pause vid
  // toggleVideoStatus() {
  //   if (video.paused) {
  //     video.play()
  //   } else {
  //     video.pause();
  //   }
  // }

  // // update play/pause icons
  // updatePlayIcon() {
  //   if (video.paused) {
  //     play.innerHTML = '<i class="fa fa-play fa-2x"></i>'
  //   } else {
  //     play.innerHTML = '<i class="fa fa-pause fa-2x"></i>'
  //   }
  // }

  // // update progress and timestamp
  // updateProgress() {
  //   progress.value = (video.currentTime / video.duration) * 100;
  //   // get minutes
  //   let mins = Math.floor(video.currentTime / 60);
  //   if (mins < 10) {
  //     mins = '0' + String(mins)
  //   }
  //   // get seconds
  //   let secs = Math.floor(video.currentTime % 60);
  //   if (secs < 10) {
  //     secs = '0' + String(secs)
  //   }
  //   timestamp.innerHTML = `${mins}:${secs}`;
  // }

  // // set video time to progress
  // setVideoProgress() {
  //   video.currentTime = (+progress.value * video.duration) / 100;
  // }

  // stopVideo() {
  //   video.currentTime = 0;
  //   video.pause();
  // }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
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
        appElement={document.getElementById('root')}
      >
        <ModalContent>
          <div className="close-modal" onClick={() => this.props.onClose()}>+</div>
          <br />
          <ModalTitle>Game Stream</ModalTitle>
          <br />
          <VideoContainer>
            <Screen>
              <video
                id="video"
                class="screen"
                src="videos/gone.mp4"
                poster="../../img/poster.png"

              >
              </video>
            </Screen>
            <Controls>
              <button class="btn" id="play" onClick={() => this.toggleVideoStatus()}>
                <i class="fa fa-play fa-2x"></i>
              </button>
              <button class="btn" id="stop">
                <i class="fa fa-stop fa-2x"></i>
              </button>
              <input
                type="range"
                id="progress"
                class="progress"
                min="0" max="100"
                step="0.1"
                value="0"
              />
              <span class="timestamp" id="timestamp">00:00</span>
            </Controls>
          </VideoContainer>
        </ModalContent>
      </Modal>
    )
  }
}

export default GamestreamModal;
