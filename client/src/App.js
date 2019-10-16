import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import { boardSetup } from './actions/boardSetup';
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
  useEffect(() => {
    store.dispatch(loadUser());
    boardSetup();
  }, [])

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Landing} />
          {/* <Navbar /> */}
          <section className="container">
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
            </Switch>
            <br />
            <Alert />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
