import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AlertContainer } from './Alert.styles.js'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
  <AlertContainer key={alert.id} className={`alert alert-${alert.alertType}`}>
    { alert.msg }
  </AlertContainer>
))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

// getting the state from alert and putting into props
const mapStateToProps = state => ({
  alerts: state.alert
})

export default connect(mapStateToProps)(Alert);