/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import './NavigationItems.scss';
import NavigationItem from './NavigationItem';

const navigationItems = (props) => {
  const { isAuthenticated } = props;
  return (
    <header>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <a className="navbar-brand h1 mb-0" href="/">Fav Quotes</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto">
            <NavigationItem link="/" exact>Home</NavigationItem>
            {!isAuthenticated ? (
              <NavigationItem link="/auth">Login</NavigationItem>
            ) : (
              <React.Fragment>
                <NavigationItem link="/favs">My Fav Quotes</NavigationItem>
                <NavigationItem link="/logout">Logout</NavigationItem>
              </React.Fragment>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

navigationItems.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

navigationItems.defaultProps = {
  isAuthenticated: null,
};

export default React.memo(navigationItems);
