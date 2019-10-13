import React, { Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const logo = require('../../img/bingo.png');

  const authLinks = (
    <Fragment>
      <div>
        <ul className="nav-table">
          <div className="nav-table-children">
            <a href="#!" onClick={logout} className="logout-button">
              <span className="hide-sm"><i className="fas fa-sign-out-alt"></i>&nbsp;Logout</span>
            </a>
            <div className="hide-sms">
              <span className="hide-sm">Profile</span>
              <span className="hide-sm">Account</span>
              <span className="hide-sm">Security</span>
              <span className="hide-sm">Settings</span>
              <span className="hide-sm">Wallet</span>
              <span className="hide-sm">Next Gamecard</span>
            </div>
          </div>
        </ul>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <ul>
      <div></div>
      {/* <ul><Link to="/register">Register&nbsp;</Link></ul>
      <ul><Link to="/login">&nbsp;Login</Link></ul>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
      {/* <img src={logo} className="bingo-logo-left" width="250px" alt=""/> */}
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
        <img src={logo} className="bingo-logo-right" width="260px" alt=""/>
        <h1>
          Bitcoin Bingo
        </h1>
      { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }
    </nav>
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
