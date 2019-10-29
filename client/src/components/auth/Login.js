import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Navbar from '../layout/Navbar';
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';
import loginPageLlogo from '../../img/logo-concept_rev_w-cards_400.png';

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
        <br />
        {/* <Navbar /> */}
        <div className="login-header">
          <img src={loginPageLlogo} alt="login-page-logo" className="login-page-logo" />
          <br />
          <h4>A fun and easy way to earn crypto by playing Bingo!</h4>
          <h4>Coming soon in 2020.</h4>
          <br />
          <h4>Don't miss out on exciting news from Blockchain Bingo. Subscribe to our newsletter for your chance at free Bingo cards and BIG rewards!</h4>
        </div>
        <br />
        <form className="form" onSubmit={e => onSubmit(e)}>
          <h1 className="large text-primary">Sign In</h1>
          <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              minLength="6"
              value={password} 
              onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </form>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h5 className="footer-login">© 2019 Copyright. Blockchain Bingo, all rights reserved.</h5>
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

