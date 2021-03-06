import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT, CLEAR_PROFILE, SET_ALERT } from './types';
import setAuthToken from '../utils/setAuthToken';

// load user
export const loadUser = () => async dispatch => {
  console.log("Loading user....")
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('/api/auth');
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })

  } catch (err) {
    console.log("ERROR: " + err);
    dispatch({
      type: AUTH_ERROR
    })
  }
}

// register user
export const register = ({ name, email, btcAddress, phoneNumber, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const body = JSON.stringify({ name, email, btcAddress, phoneNumber, password })
  try {
    const res = await axios.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL
    })
  }
}

// login user
export const login = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await axios.post('/api/auth', body, config);
    dispatch({
      type: LOGIN_SUCCESS, SET_ALERT,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Login success', 'success'));

  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: LOGIN_FAIL
    })
  }
}

// update user
// export const updateUser = ({ id, name, email, btcAddress, phoneNumber, password }) => async dispatch => {
//   const config = {
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   }
//   const body = JSON.stringify({ id ,name, email, btcAddress, phoneNumber, password })
//   try {
//     const res = await axios.put('/api/users', body, config);
//     dispatch({
//       type: UPDATE_ACCOUNT,
//       payload: res.data
//     });
//     dispatch(setAlert('success'));

//   } catch (err) {
//     const errors = err.response.data.errors;
//     if (errors) {
//       errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
//     }
//     dispatch({
//       type: AUTH_ERROR
//     })
//   }
// }

// logout / clear profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
}