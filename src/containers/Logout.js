/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable linebreak-style */
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout } from "../store/authActions";

class Logout extends Component {

  componentDidMount() {
    this.props.logout();
  }

  render() {
    // eslint-disable-next-line prefer-const
    let props = {
      pathname: '/',
      logout: true,
    };
    return <Redirect to={props} />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);