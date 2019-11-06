/* eslint-disable prefer-template */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-lonely-if */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Home.scss';
import { setPublicQuotes } from '../store/favQuotesActions';
import { AUTH_LOGOUT, NOT_ACTIVE_SESSION } from '../store/action-types';
import { logoutAux, clearSession } from './LogoutAux';
import PublicQuotes from './PublicQuotes';
import NavigationItems from './NavigationItems';
import axios from '../../axios-config';
import 'bootstrap';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      quote: {
        body: '',
        author: '',
      },
    };
    this.getDailyQuote = this.getDailyQuote.bind(this);
  }

  componentDidMount() {
    const {
      isAuthenticated,
      getPublicQuotes,
      setNotActiveSession,
      sessionNotActive,
      logout,
    } = this.props;

    if (sessionNotActive === 'false') {
      getPublicQuotes();
      // tick tock to end session
      clearSession(setNotActiveSession);
    } else {
      if (isAuthenticated) {
        logoutAux(logout);
      } else {
        this.getDailyQuote();
      }
    }
  }

  componentDidUpdate() {
    // check if user is not auth
    const { isAuthenticated } = this.props;
    const { quote: { body, author } } = this.state;
    if (!isAuthenticated && body === '' && author === '') {
      this.getDailyQuote();
    }
  }

  getDailyQuote = () => {
    axios.get('/qotd')
      .then((response) => {
        this.setState({
          // eslint-disable-next-line react/no-unused-state
          quote: {
            body: response.data.quote.body,
            author: response.data.quote.author,
          },
        });
      })
      .catch((error) => {
        // handle error
        console.log(error);
      });
  }

  render() {
    const { isAuthenticated } = this.props;
    const { quote: { body, author } } = this.state;
    return (
      <main className="main container-fluid px-0">
        <NavigationItems isAuthenticated={isAuthenticated} />
        {!isAuthenticated ? (
          <React.Fragment>
            <div className="container mt-5" style={{ marginTop: '80px' }}>
              <div className="card">
                <div className="card-header h3 text-left font-weight-bold">Quote of the day</div>
                <div className="card-body">
                  <blockquote className="blockquote mb-0">
                    <p id="quote-body" className="text-justify">{'"' + body + '"'}</p>
                    <footer className="blockquote-footer text-left">{author}</footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <div className="quotes-wrapper">
            <h1>Public Quotes</h1>
            <PublicQuotes />
          </div>
        )}
      </main>
    );
  }
}

Home.defaultProps = {
  isAuthenticated: null,
};

Home.propTypes = {
  isAuthenticated: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  getPublicQuotes: PropTypes.func.isRequired,
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
    getPublicQuotes: () => {
      dispatch(setPublicQuotes());
    },
    logout: () => dispatch({
      type: AUTH_LOGOUT,
    }),
    setNotActiveSession: () => dispatch({
      type: NOT_ACTIVE_SESSION,
    }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
export { Home };
