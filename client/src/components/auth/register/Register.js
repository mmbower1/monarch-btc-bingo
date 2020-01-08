import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// styles
import { FormGroup } from './Register.styles.js';
import { Footer } from '../../footer/Footer.styles.js';
// import Navbar from '../layout/Navbar';
import { setAlert } from '../../../actions/alert';
import { register } from '../../../actions/auth';
import PropTypes from 'prop-types';
// import axios from 'axios';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    btcAddress: '',
    phoneNumber: '',
    password: '',
    password2: ''
  });

  const { name, email, btcAddress, phoneNumber, password, password2 } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, btcAddress, phoneNumber, password })
    }
  }

  // redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <div className="auth-register-container">
      <Fragment>
        {/* <Navbar /> */}
        <form className="form" onSubmit={e => onSubmit(e)}>
          {/* <h1 className="large text-primary">Sign Up</h1> */}
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
          <FormGroup>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={e => onChange(e)}
            />
          </FormGroup>
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
              type="text"
              placeholder="BTC Address"
              name="btcAddress"
              value={btcAddress}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="phoneNumber"
              placeholder="Phone Number"
              name="phoneNumber"
              value={phoneNumber}
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
          <FormGroup>
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2}
              onChange={e => onChange(e)}
            />
          </FormGroup>
          <p className="lead">Please keep password stored somewhere safe!</p>
          <div className="register-button">
            <input type="submit" className="btn-register btn-primary" value="REGISTER" />
          </div>
          <div className="no-account-container">
            <p className="no-account">
              Already registered?<br /><Link to="/login" className="sign-up">SIGN IN</Link>
            </p>
          </div>
        </form>
        <Footer>© 2019 Copyright. Blockchain Bingo, all rights reserved.</Footer>
      </Fragment>
    </div>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);
