/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { useState } from 'react';
import './Quote.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-config';
import { AUTH_LOGOUT } from '../store/action-types';
import { logoutAux } from './LogoutAux';

const Quote = (props) => {
  // current state
  const btnStyleState = useState({
    disabled: false,
    backgroundColor: '#5592ff',
    opacity: 1,
    cursor: 'pointer',
  });

  const updateBtnStyle = () => {
    btnStyleState[1](() => ({
      disabled: true,
      backgroundColor: '#ccc',
      opacity: '.5',
      cursor: 'inherit',
    }));
  };

  const favOrUnfavQuote = (quote, isFavorite) => {
    // check if there's session
    const { sessionNotActive, logout } = props;
    if (sessionNotActive === 'true') {
      logoutAux(logout);
      return;
    }
    // check if quote is disabled
    if (btnStyleState[0].disabled) {
      return;
    }
    // add to favs
    const favOrUnfav = isFavorite ? 'unfav' : 'fav';
    axios
      .put(`/quotes/${quote.id}/${favOrUnfav}`)
      .then((response) => {
        console.log(response.data);
        updateBtnStyle();
      })
      .catch((error) => {
        // async call was a failure
        console.log(error);
      });
  };

  const { quote } = props;
  const {
    quote: {
      body: quoteBody,
      author: quoteAuthor,
      user_details: {
        favorite: favoriteOrNot,
      },
    },
  } = props;

  const btn = (
    <button
      style={{
        disabled: btnStyleState[0].disabled,
        backgroundColor: btnStyleState[0].backgroundColor,
        opacity: btnStyleState[0].opacity,
        cursor: btnStyleState[0].cursor,
      }}
      type="button"
      onClick={() => { favOrUnfavQuote(quote, favoriteOrNot); }}
    >
      {favoriteOrNot ? 'Unfav' : 'Add to Favs'}
    </button>
  );

  return (
    <li className="quote">
      <div className="quote-body">{`"${quoteBody}"`}</div>
      <div className="quote-author"><strong>{quoteAuthor}</strong></div>
      {btn}
    </li>
  );
};

const mapStateToProps = state => ({
  sessionNotActive: state.authReducer.sessionNotActive,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({
      type: AUTH_LOGOUT,
    }),
  };
};

Quote.propTypes = {
  sessionNotActive: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
  quote: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quote);
