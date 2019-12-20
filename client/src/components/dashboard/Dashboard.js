import React, { Fragment, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
// import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner';
import RandomNumber from './randNum/RandomNumber';
import Gameboard from './gameboard/Gameboard';
// import Winner from './winner/Winner';
// import axios from 'axios';

// titlebar modals
import AboutUsModal from '../../modals/titlebar/AboutUsModal';
import MeetOurTeamModal from '../../modals/titlebar/MeetOurTeamModal';
import OurMissionModal from '../../modals/titlebar/OurMissionModal';
import TestimonialsModal from '../../modals/titlebar/TestimonialsModal';
import BingoExplainedModal from '../../modals/titlebar/BingoExplainedModal';
import GameArchivesModal from '../../modals/titlebar/GameArchivesModal';
// gameboard modals
import RealTimeNewsModal from '../../modals/gameboard/RealTimeNewsModal';
import EducationModal from '../../modals/gameboard/EduResourcesModal';
import LiveCommBlogModal from '../../modals/gameboard/LiveCommBlogModal';
import AdsRelativeToBlockchain from '../../modals/gameboard/AdsBlockchainModal';

// import cronjob from '../../cronjob.js';

const Dashboard = ( { getCurrentProfile, auth: { user }, profile: { profile, loading } } ) => {
  // titlebar modals
  const [isAboutUsModalOpen, setIsAboutUsModalOpen] = useState(false);
  const [isBingoExplainedModalOpen, setIsBingoExplainedModalOpen] = useState(false);
  const [isOurMissionModalOpen, setIsOurMissionModalOpen] = useState(false);
  const [isMeetOurTeamModalOpen, setIsMeetOurTeamModalOpen] = useState(false);
  const [isTestimonialsModalOpen, setIsTestimonialsModalOpen] = useState(false);
  const [isGameArchivesModalOpen, setIsGameArchivesModalOpen] = useState(false);
  const openAboutUsModal = () => { setIsAboutUsModalOpen(true) }
  const openOurMissionModal = () => { setIsOurMissionModalOpen(true) }
  const openMeetOurTeamModal = () => { setIsMeetOurTeamModalOpen(true) }
  const openTestimonialsModal = () => { setIsTestimonialsModalOpen(true) }
  const openGameArchivesModal = () => { setIsGameArchivesModalOpen(true) }
  const openBingoExplainedModal = () => { setIsBingoExplainedModalOpen(true) }
  // gameboard modals
  const [isAdsModalOpen, setIsAdsModalOpen] = useState(false);
  const [isEducationModalOpen, setIsEducationModalOpen] = useState(false);
  const [isRealTimeNewsModalOpen, setIsRealTimeNewsModalOpen] = useState(false);
  const [isLiveCommBlogModalOpen, setIsLiveCommBlogModalOpen] = useState(false);
  const openAdsModal = () => { setIsAdsModalOpen(true) }
  const openEducationModal = () => { setIsEducationModalOpen(true) }
  const openRealTimeNewsModal = () => { setIsRealTimeNewsModalOpen(true) }
  const openLiveCommBlogModal = () => { setIsLiveCommBlogModalOpen(true) }

  // const [randomNumber, setRandomNumber] = useState(0);

  // empty array at end allows it only run once
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return (
    <div className="dashboard-container">
      {/* <Navbar /> */}
      {/* titlebar modals*/}
      <AboutUsModal open={isAboutUsModalOpen} onClose={() => setIsAboutUsModalOpen(false)}/>
      <OurMissionModal open={isOurMissionModalOpen} onClose={() => setIsOurMissionModalOpen(false)}/>
      <MeetOurTeamModal open={isMeetOurTeamModalOpen} onClose={() => setIsMeetOurTeamModalOpen(false)}/>
      <TestimonialsModal open={isTestimonialsModalOpen} onClose={() => setIsTestimonialsModalOpen(false)}/>
      <GameArchivesModal open={isGameArchivesModalOpen} onClose={() => setIsGameArchivesModalOpen(false)}/>
      <BingoExplainedModal open={isBingoExplainedModalOpen} onClose={() => setIsBingoExplainedModalOpen(false)}/>
      {/* gameboard modals */}
      <AdsRelativeToBlockchain open={isAdsModalOpen} onClose={() => setIsAdsModalOpen(false)}/>
      <LiveCommBlogModal open={isLiveCommBlogModalOpen} onClose={() => setIsLiveCommBlogModalOpen(false)}/>
      <RealTimeNewsModal open={isRealTimeNewsModalOpen} onClose={() => setIsRealTimeNewsModalOpen(false)}/>
      <EducationModal open={isEducationModalOpen} onClose={() => setIsEducationModalOpen(false)}/>
        <table className="top-tr">
          <thead>
            <tr>
              <th id="aboutUs-modal" onClick={openAboutUsModal}>About Us</th>
              <th id="bingoExplained-modal" onClick={openBingoExplainedModal}>Btc Bingo Info</th>
              <th id="gameArchives-modal" onClick={openGameArchivesModal}>Game Archives</th>
              <th id="meetOurTeam-modal" onClick={openMeetOurTeamModal}>Meet Our Team</th>
              <th id="ourMission-modal" onClick={openOurMissionModal}>Mission & Vision</th>
              <th id="testimonials-modal" onClick={openTestimonialsModal}>Testimonials</th>
              </tr>
          </thead>
        </table>
      <nav>
        <br />
        <h2 className="dashboard-title">Cryptocurrency Simplified for Mass Adoption</h2>
        {loading && profile === null ? (
          <Spinner />
        ) : (
          <Fragment>
            <img className="gravatar" src={`${user && user.avatar}`} alt="" />
            <p className="welcome-title">
              <i className="fa fa-angle-double-right"></i> Welcome { user && user.name } <i className="fa fa-angle-double-left"></i>
            </p>
            {/* {profile !== null ? (
              <Fragment>has</Fragment>
            ) : (
              <Fragment>has not</Fragment>
            )} */}
          </Fragment>
          )
        }
      </nav>
      <br />
      <RandomNumber />
      <br />
      {/* <Winner /> */}
      <div className="dashboard-body">
        <div className="row-1">
          <span id="gameStream-modal" className="gameStream-modal">Game Stream</span>
        </div>
        <br />
        <div className="row-2">
          <span id="live-community-blog" onClick={openLiveCommBlogModal}>Live Community Blog</span>&nbsp;&nbsp;&nbsp;
            {/* <div className="winner-div">
            </div> */}
          <span id="realTimeNews-modal" onClick={openRealTimeNewsModal}>Real Time News</span>
        </div>
        <Gameboard />
        <div className="row-3">
          <span id="ads-relative-to-blockchain" onClick={openAdsModal}>Ads Relative to Blockchain</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span id="education-modal" onClick={openEducationModal}>Educational Resources</span>
        </div>
        <br />
        <br />
      </div>
      <h5 className="footer-dashboard">© 2019 Copyright. Blockchain Bingo, all rights reserved.</h5>
    </div>
  )
}

// gets state of each below key
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
}

// anything in reducer state is now available in this file
const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
