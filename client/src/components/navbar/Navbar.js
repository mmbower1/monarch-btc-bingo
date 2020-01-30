import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
// navbar modals
import AccountModal from '../../modals/navbar/AccountModal';
import ProfileModal from '../../modals/navbar/ProfileModal';
import NextGamecardModal from '../../modals/navbar/NextGamecardModal'
import SecurityModal from '../../modals/navbar/SecurityModal';
import SettingsModal from '../../modals/navbar/SettingsModal';
import WalletModal from '../../modals/navbar/WalletModal';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const logo = require('../../img/bitcoinbingologo.png');

  // navbar modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNextGamecardModalOpen, setIsNextGamecardModalOpen] = useState(false);
  const [isSecurityModalOpen, setIsSecurityModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openAccountModal = () => { setIsAccountModalOpen(true) };
  const openNextGamecardModal = () => { setIsNextGamecardModalOpen(true) };
  const openProfileModal = () => { setIsProfileModalOpen(true) };
  const openSecurityModal = () => { setIsSecurityModalOpen(true) };
  const openSettingsModal = () => { setIsSettingsModalOpen(true) };
  const openWalletModal = () => { setIsWalletModalOpen(true) };

  const authLinks = (
    <Fragment>
      <div>
        <h2>Bitcoin Bingo playcard</h2>
        <a href="#!" onClick={logout} className="logout-button">
          <span className="hide-sm"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</span>
        </a>
        <div className="hide-sms">
          <span id="account-modal" className="hide-sm" onClick={openAccountModal}>Account</span>
          <span id="nextGamecard-modal" className="hide-sm" onClick={openNextGamecardModal}>Next Card</span>
          <span id="profile-modal" className="hide-sm" onClick={openProfileModal}>Profile</span>
          <span id="security-modal" className="hide-sm" onClick={openSecurityModal}>Security</span>
          <span id="settings-modal" className="hide-sm" onClick={openSettingsModal}>Settings</span>
          <span id="wallet-modal" className="hide-sm" onClick={openWalletModal}>Wallet</span>
        </div>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <div className='welcome-title'>
        <h2>
            WELCOME
        </h2>
      </div>
      {/* <ul><Link to="/register">Register&nbsp;</Link></ul>
      <ul><Link to="/login">&nbsp;Login</Link></ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      {/* <img src={logo} className="bingo-logo-left" width="250px" alt=""/> */}
    </ul>
  );


  return (
    <div className="navbar-container">
      {/* navbar modals */}
      <AccountModal open={isAccountModalOpen} onClose={() => setIsAccountModalOpen(false)}/>
      <ProfileModal open={isProfileModalOpen} onClose={() => setIsProfileModalOpen(false)}/>
      <NextGamecardModal open={isNextGamecardModalOpen} onClose={() => setIsNextGamecardModalOpen(false)}/>
      <SecurityModal open={isSecurityModalOpen} onClose={() => setIsSecurityModalOpen(false)}/>
      <SettingsModal open={isSettingsModalOpen} onClose={() => setIsSettingsModalOpen(false)}/>
      <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)}/>

      <nav className="navbar bg-dark">
        <img src={logo} className="bingo-logo-right" alt="" />
        
        { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
      </nav>
    </div>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);
