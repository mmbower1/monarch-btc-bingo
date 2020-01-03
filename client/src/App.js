import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import Landing from './components/landing/Landing';
import Register from './components/auth/register/Register';
import Login from './components/auth/login/Login';
import Alert from './components/alert/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
// import  boardSetup  from './actions/boardSetup';
import setAuthToken from './utils/setAuthToken';
// redux
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
import ForgotPassword from './components/password/forgot/ForgotPassword';
import ResetPassword from './components/password/reset/ResetPassword';
import { Stripe } from './components/stripe/Stripe';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // used in functional components, not class based components where componentDidMount() is used instead
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
