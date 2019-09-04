/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

// eslint-disable-next-line no-unused-vars
export const addFav = quote => (dispatch) => {
    axios
    .put('/quotes/' + quote.id + '/fav')
    .then((response) => {
        console.log(response.data);
        // async call was success
        dispatch(favSuccess(response.data));
        // dispatch(checkSessionTokenTimeout(localStorage.getItem('expirationDate')));
    })
    .catch((error) => {
        // async call was a failure
        console.log(error);
    });
};

const favSuccess = (quote) => ({
    type: actionTypes.ADD_FAV,
    quote: quote,
});

export const setPublicQuotes = quotes => (dispatch) => {
    dispatch(addPublic(quotes));
}

const addPublic = (quotes) => ({
    type: actionTypes.ADD_PUBLIC,
    quotes: quotes
})
