/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Quote from './Quote';

const PublicQuotesManager = (props) => {
  const { quotes } = props;
  const publicQuotes = quotes != null ? quotes.map(quote => (
    <Quote
      key={quote.id}
      quote={quote}
    />
  )) : <p id="no-public-quotes">There are no public quotes</p>;

  return publicQuotes;
};

PublicQuotesManager.defaultProps = {
  quotes: null,
};

PublicQuotesManager.propTypes = {
  quotes: PropTypes.instanceOf(Object),
};

const mapStateToProps = state => ({
  quotes: state.favQuotesReducer.publicQuotes,
});

export default connect(
  mapStateToProps,
)(PublicQuotesManager);
// testing purposes
export { PublicQuotesManager };
