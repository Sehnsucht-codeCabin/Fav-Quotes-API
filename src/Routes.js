/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About } from './containers';
import Authenticator from './containers/Auth';
import Logout from './containers/Logout';

const Routes = () => (
  <Switch>
    <Route path="/auth" component={Authenticator} />
    <Route path="/about" component={About} />
    <Route path="/logout" component={Logout} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
