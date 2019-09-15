/* eslint-disable max-len */
/* eslint-disable prefer-template */
/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quote from './Quote';
import { addFav } from '../store/favQuotesActions';
import axios from '../../axios-config';

class publicQuotesManager extends Component {

  constructor() {
    super();
    this.addFavouriteQuote = this.addFavouriteQuote.bind(this);
  }

  addFavouriteQuote(quote) {
    axios
      .put('/quotes/' + quote.id + '/fav')
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        // async call was a failure
        console.log(error);
      });
  }

  render() {
    const quotes = this.props.quotes != null ? this.props.quotes.map((quote, index) => {
      return (
        <Quote
          key={index}
          quote={quote}
          onAdd={() => { this.addFavouriteQuote(quote); }}
        />
      );
    }) : null;

    return quotes;
  }
}

const mapStateToProps = state => ({
  quotes: state.favQuotesReducer.publicQuotes,
});

const mapDispatchToProps = (dispatch) => {
  return {
    onAdd: (quote) => {
      dispatch(addFav(quote));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(publicQuotesManager);