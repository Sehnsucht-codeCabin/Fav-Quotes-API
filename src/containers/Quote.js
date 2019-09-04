/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-parens */
import React from "react";

const Quote = props => {
  return (
    <li>
        <div className="quote-body">{props.quote.body}</div>
        <span>--</span>
        <div className="quote-author"><strong>{props.quote.author}</strong></div>
        <button onClick={props.onAdd}>Add to Favs</button>
    </li>
  )
}

export default Quote;