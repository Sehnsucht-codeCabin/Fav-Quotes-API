/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable linebreak-style */
import React, { PureComponent } from 'react';
import './Quote.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from '../../axios-config';
import { AUTH_LOGOUT } from '../store/action-types';
import { logoutAux } from './LogoutAux';

class Quote extends PureComponent {
  unfavQuote = (event, quote) => {
    // check if there's session
    const { sessionNotActive, logout } = this.props;
    if (sessionNotActive === 'true') {
      logoutAux(logout);
      return;
    }
    const myEvent = event;
    myEvent.target.disabled = true;
    myEvent.target.style.backgroundColor = '#ccc';
    myEvent.target.style.opacity = '.5';
    myEvent.target.style.cursor = 'inherit';
    // add to favs
    axios
      .put(`/quotes/${quote.id}/unfav`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // async call was a failure
        console.log(error);
      });
  };

  favQuote = (event, quote) => {
    // check if there's session
    const { sessionNotActive, logout } = this.props;
    if (sessionNotActive === 'true') {
      logoutAux(logout);
      return;
    }
    const myEvent = event;
    myEvent.target.disabled = true;
    myEvent.target.style.backgroundColor = '#ccc';
    myEvent.target.style.opacity = '.5';
    myEvent.target.style.cursor = 'inherit';
    // add to favs
    axios
      .put(`/quotes/${quote.id}/fav`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // async call was a failure
        console.log(error);
      });
  };

  render() {
    const { quote } = this.props;
    const {
      quote: {
        body: quoteBody,
        author: quoteAuthor,
        user_details: {
          favorite: favoriteOrNot,
        },
      },
    } = this.props;

    const btn = favoriteOrNot ? <button type="button" onClick={(event) => { this.unfavQuote(event, quote); }}>Unfav</button> : <button type="button" onClick={(event) => { this.favQuote(event, quote); }}>Add to Favs</button>;

    return (
      <li className="quote">
        <div className="quote-body">{`"${quoteBody}"`}</div>
        <div className="quote-author"><strong>{quoteAuthor}</strong></div>
        {btn}
      </li>
    );
  };

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
