/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-parens */
import React from "react";

// eslint-disable-next-line arrow-body-style
const Quote = props => {
  return (
    <li>
        <div className="quote-body">{props.quote.body}</div>
        <span>--</span>
        <div className="quote-author"><strong>{props.quote.author}</strong></div>
        <button type="button" onClick={props.onAdd}>Add to Favs</button>
    </li>
  )
}

export default Quote;