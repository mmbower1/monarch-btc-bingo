import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
// import Navbar from '../layout/Navbar';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
// import registerPageLlogo from '../../img/logo-concept_rev_w-cards_400.png';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    erc20: '',
    phoneNumber: '',
    password: '',
    password2: ''
  });

  const { name, email, erc20, phoneNumber, password, password2 } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ name, email, erc20, phoneNumber, password })
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
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
          <div className="form-group">
            <input 
              type="text" 
              placeholder="Name" 
              name="name" 
              value={name} 
              onChange={e => onChange(e)}
            />
          </div>
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
              type="erc20" 
              placeholder="ERC20 (ETH) Address" 
              name="erc20"
              value={erc20} 
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input 
              type="phoneNumber" 
              placeholder="Phone Number" 
              name="phoneNumber"
              value={phoneNumber} 
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
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              minLength="6"
              value={password2} 
              onChange={e => onChange(e)}
            />
          </div>
          <h4>Please keep password stored somewhere safe!</h4>
          <br />
          <input type="submit" className="btn-register btn-primary" value="Register" />
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </form>
        <h5 className="footer-register">© 2019 Copyright. Blockchain Bingo, all rights reserved.</h5>
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
