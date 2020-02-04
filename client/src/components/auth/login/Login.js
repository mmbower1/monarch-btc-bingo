import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// styles
import { FormGroup } from './Login.styles.js';
import { Footer } from '../../footer/Footer.styles.js';
// import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types'
import { login } from '../../../actions/auth';
// import loginPageLlogo from '../../img/logo-concept_rev_w-cards_400.png';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    login(email, password);
  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="auth-login-container">
      <Fragment>
        {/* <Navbar /> */}
        <div className="login-header">
          {/* <img src={loginPageLlogo} alt="login-page-logo" className="login-page-logo" /> */}
        </div>
        <form className="form" onSubmit={e => onSubmit(e)}>
          {/* <h1 className="large text-primary">Sign In</h1> */}
          <p className="lead"><i className="fas fa-user"></i> Login</p>
          <FormGroup>
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <div className="sign-in-button">
            <input type="submit" className="btn-login btn-primary" value="SIGN IN" />
          </div>
          <br />
          <Link className='forgot-password' to='/forgotPassword'>Forgot Password?</Link>
          <div className="no-account-container">
            <p className="no-account">
              No account? Registration is free!<br /><Link to="/register" className="sign-up">REGISTER</Link>
            </p>
          </div>
        </form>
        <br />
        <br />
        <i className="fas fa-arrow-left"></i>&nbsp;
        <Link to='/stripe'>Go Back</Link>
        <Footer>© 2020 Copyright. Blockchain Bingo, all rights reserved.</Footer>
      </Fragment>
    </div>
  )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

