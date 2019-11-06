/* eslint-disable linebreak-style */
/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Home.scss';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import FavoriteQuotes from './FavoriteQuotes';
import NavigationItems from './NavigationItems';
import { logoutAux, clearSession } from './LogoutAux';
import { setFavoriteQuotes } from '../store/favQuotesActions';
import { AUTH_LOGOUT, NOT_ACTIVE_SESSION } from '../store/action-types';

class Favs extends Component {
  componentDidMount() {
    const {
      isAuthenticated,
      getFavQuotes,
      setNotActiveSession,
      sessionNotActive,
      logout,
    } = this.props;

    if (sessionNotActive === 'false') {
      getFavQuotes();
      // tick tock to end session
      clearSession(setNotActiveSession);
    } else {
      if (isAuthenticated) {
        logoutAux(logout);
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    return (
      <main className="container">
        <div>
          <NavigationItems isAuthenticated={isAuthenticated} />
          {!isAuthenticated ? (
            (<Redirect to="/" />)
          ) : (
            <div className="quotes-wrapper">
              <h1>Fav Quotes</h1>
              <FavoriteQuotes />
            </div>
          )}
        </div>
      </main>
    );
  }
}

Favs.defaultProps = {
  isAuthenticated: null,
};

Favs.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  getFavQuotes: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  setNotActiveSession: PropTypes.func.isRequired,
  sessionNotActive: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.token,
  sessionNotActive: state.authReducer.sessionNotActive,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getFavQuotes: () => {
      dispatch(setFavoriteQuotes());
    },
    logout: () => dispatch({
      type: AUTH_LOGOUT,
    }),
    setNotActiveSession: () => dispatch({
      type: NOT_ACTIVE_SESSION,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favs);
// the following is for testing purposes
export { Favs };
