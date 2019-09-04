/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Quote from './Quote';
import { addFav } from '../store/favQuotesActions';

class publicQuotesManager extends Component {

  render() {
    const quotes = this.props.quotes != null ? this.props.quotes.map((quote, index) => {
      return (
        <Quote
          key={index}
          quote={quote}
          onAdd={() => { this.props.onAdd(quote) }}
        />
      );
    }) : null;

    return quotes;
  }
};

const mapStateToProps = state => {
  return {
    quotes: state.favQuotesReducer.publicQuotes,
  };
};

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