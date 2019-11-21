import React, { Fragment, useState } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';
// navbar modals
import AccountModal from '../../modals/navbar/AccountModal';
import ProfileModal from '../../modals/navbar/ProfileModal';
import WalletModal from '../../modals/navbar/WalletModal';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const logo = require('../../img/bitcoinbingologo.png');

  // navbar modals
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const openAccountModal = () => { setIsAccountModalOpen(true) };
  const openProfileModal = () => { setIsProfileModalOpen(true) };
  const openWalletModal = () => { setIsWalletModalOpen(true) };

  const authLinks = (
    <Fragment>
      <div>
        <ul className="nav-table">
          <div className="nav-table-children">
            <h2>Bitcoin Bingo Playcard</h2>
            <a href="#!" onClick={logout} className="logout-button">
              <span className="hide-sm"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</span>
            </a>
            <div className="hide-sms">
              <span id="profile-modal" className="hide-sm" onClick={openProfileModal}>Profile</span>
              <span id="account-modal" className="hide-sm" onClick={openAccountModal}>Account</span>
              <span id="security-modal" className="hide-sm">Security</span>
              <span id="settings-modal" className="hide-sm">Settings</span>
              <span id="wallet-modal" className="hide-sm" onClick={openWalletModal}>Wallet</span>
              <span id="nextGamecard-modal" className="hide-sm">Next Gamecard</span>
            </div>
          </div>
        </ul>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <div>
        <h2>
            Welcome to Bitcoin Bingo
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
      <WalletModal open={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)}/>

      <nav className="navbar bg-dark">
          <img src={logo} className="bingo-logo-right" alt=""/>
        
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
