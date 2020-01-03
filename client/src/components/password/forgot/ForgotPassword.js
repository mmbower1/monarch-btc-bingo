import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// styles
import { Footer } from '../../footer/Footer.styles';
import PropTypes from 'prop-types';
// actions
import { setAlert } from '../../../actions/alert';
import axios from 'axios';
import nodemailer from 'nodemailer';

const ForgotPassword = (email, { setAlert }) => {
    const onSubmit = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify({ email });
        if (body == "") {
            setAlert('Email is required', 'danger');
        }

        await axios.get('/api/forgotPassword', body, config);
        // if () {
        //     setAlert('Email does not exist');
        // } else {
        //     setAlert('An email has been sent!');
        // }
        console.log('forgot');
    }

    return (
        <div className="row">
            <div className="col-md-12">
                <form action="/api/forgotPassword" method="POST" onSubmit={onSubmit}>
                    <h1>Forgot Password?</h1>
                    <div className="form-group-forgotPassword">
                        <br />
                        <label htmlFor="email">Enter Your Email: </label>
                        <input type="email" name="email" autoFocus className="form-control" />
                    </div>
                    <div className="form-group" >
                        <input type="submit" className="btn-login btn-primary" value="Reset" />
                    </div>
                    <Link to='/login'>Go Back</Link>
                </form>
                <Footer>© 2019 Copyright. Blockchain Bingo, all rights reserved.</Footer>
            </div>
        </div>
    )
}

ForgotPassword.propTypes = {
    isAuthenticated: PropTypes.bool,
  }

//   const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
//   })

export default connect(null, { setAlert })(ForgotPassword)
