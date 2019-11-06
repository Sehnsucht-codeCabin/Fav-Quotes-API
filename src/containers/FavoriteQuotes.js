/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quote from './Quote';

class favQuotesManager extends Component {
  render() {
    const { quotes } = this.props;
    const receivedQuotes = quotes != null ? quotes.map(quote => (
      <Quote
        key={quote.id}
        quote={quote}
      />
    )) : <p>You do not have any fav quotes yet.</p>;

    return receivedQuotes;
  }
}

const mapStateToProps = state => ({
  quotes: state.favQuotesReducer.favQuotes,
});

favQuotesManager.propTypes = {
  quotes: PropTypes.instanceOf(Object).isRequired,
};

export default connect(
  mapStateToProps,
)(favQuotesManager);
