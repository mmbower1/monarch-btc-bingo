import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
// containers
import Landing from './containers/landing/Landing';
import Dashboard from './containers/dashboard/Dashboard';
import { Stripe } from './containers/stripe/Stripe';
import ForgotPassword from './containers/password/forgot/ForgotPassword';
import ResetPassword from './containers/password/reset/ResetPassword';
// components
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Alert from './components/alert/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
// import  boardSetup  from './actions/boardSetup';
import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // used in functional components, not class based components where componentDidMount() is used instead
  // userSet data keeps reverting back to inital state, check if session token is in localstorage and exists, if not - send back to login. If yes - loadUser(), wait for it to finish to show UI.
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
        <Navbar />
        <br />
        <Alert />
          <Route exact path="/" component={Landing} />
          <section className="app-container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <Route exact path='/forgotPassword' component={ForgotPassword} />
              <Route exact path='/resetPassword' component={ResetPassword} />
              <Route exact path='/stripe' component={Stripe} />
            </Switch>
            <br />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
