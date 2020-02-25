import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Footer } from '../../components/footer/Footer.styles.js';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { LandingContainer } from './Landing.styles.js.js'
// import Navbar from './Navbar';
// import loginPageLlogo from '../../img/logo-concept_rev_w-cards_400.png';


const Landing = ({ isAuthenticated, setAlert }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  const onClick = () => {
    setAlert('Sorry, you are not of age to play', 'danger');
  }

  return (
      <LandingContainer>
        <h2>Are you over 18?</h2>
        <Link to='/stripe' className="btn-landing btn-primary"><button className="yes-button">Yes</button></Link>&nbsp;
        <Link to='#!' className="btn-landing btn-primary"><button onClick={onClick} className="no-button">No</button></Link>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Footer>© 2019 Copyright. Blockchain Bingo, all rights reserved.</Footer>
      </LandingContainer>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
  setAlert: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert })(Landing)
