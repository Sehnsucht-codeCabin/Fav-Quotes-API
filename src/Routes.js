/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from './containers';
import Favs from './containers/Favs';
import Authenticator from './containers/Auth';
import Logout from './containers/Logout';

const Routes = () => (
  <Switch>
    <Route path="/auth" component={Authenticator} />
    <Route path="/logout" component={Logout} />
    <Route path="/favs" component={Favs} />
    <Route exact path="/" component={Home} />
  </Switch>
);

export default Routes;
