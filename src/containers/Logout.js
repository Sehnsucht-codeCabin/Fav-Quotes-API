/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AUTH_LOGOUT } from '../store/action-types';
import { logoutAux } from './LogoutAux';

class Logout extends Component {
  componentDidMount() {
    const { logout } = this.props;
    logoutAux(logout);
  }

  render() {
    const { isAuthenticated } = this.props;
    return !isAuthenticated ? <Redirect to="/" /> : null;
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.token,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({
      type: AUTH_LOGOUT,
    }),
  };
};

Logout.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  logout: PropTypes.func.isRequired,
};

Logout.defaultProps = {
  isAuthenticated: null,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Logout);
