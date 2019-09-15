/* eslint-disable linebreak-style */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Home.scss';
import axios from '../../axios-config';
import ToolBar from './ToolBar';
import PublicQuotes from './PublicQuotes';
import { setPublicQuotes } from '../store/favQuotesActions';

class Home extends Component {
  constructor() {
    super();
    this.quoteBody = React.createRef();
    this.quoteAuthor = React.createRef();
  }

  componentDidMount() {
    if (!this.props.isAuthenticated || this.props.location.logout === true) {
      axios.get('/qotd')
        .then((response) => {
          // handle success
          this.quoteBody.current.innerHTML = response.data.quote.body;
          this.quoteAuthor.current.innerHTML = response.data.quote.author;
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    } else {
      axios.get('/quotes')
        .then((response) => {
          // handle success
          this.props.getPublicQuotes(response.data.quotes);
          //console.log(response.data.quotes);
        })
        .catch((error) => {
          // handle error
          console.log(error);
        });
    }
  }

  render() {
    return (
      <main className="container">
        <div>
          <ToolBar />
          {!this.props.isAuthenticated || this.props.location.logout === true ? (
            <div className="quoteWrapper">
              <p id="quoteBody" ref={this.quoteBody}></p>
              <p id="quoteAuthor" ref={this.quoteAuthor}></p>
            </div>
          ) : (
              <div className="quoteWrapper">
                <PublicQuotes />
              </div>
            )}


        </div>
      </main>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.token !== null,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getPublicQuotes: (quotes) => {
      dispatch(setPublicQuotes(quotes));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);