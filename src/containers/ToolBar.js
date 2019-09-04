/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ToolBar.scss';
import NavigationItems from './NavigationItems';

class ToolBar extends Component {

  render() {
    return (
      <header className="Toolbar">
        <nav className="DesktopOnly">
          <NavigationItems isAuthenticated={this.props.isAuthenticated} />
        </nav>
      </header>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(ToolBar);