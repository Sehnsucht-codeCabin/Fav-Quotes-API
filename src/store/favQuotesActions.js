/* eslint-disable object-shorthand */
/* eslint-disable no-use-before-define */
/* eslint-disable prefer-template */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
import * as actionTypes from './action-types';
import axios from '../../axios-config';

// eslint-disable-next-line no-unused-vars
// export const addFav = quote => (dispatch) => {
//     axios
//     .put('/quotes/' + quote.id + '/fav')
//     .then((response) => {
//         console.log(response.data);
//         // async call was success
//         dispatch(favSuccess(response.data));    })
//     .catch((error) => {
//         // async call was a failure
//         console.log(error);
//     });
// };

// const favSuccess = (quote) => ({
//     type: actionTypes.ADD_FAV,
//     quote: quote,
// });

// export const addQuote = quote => (dispatch) => {
//     dispatch(addFavQuote(quote));
// };

// export const removeQuote = quote => (dispatch) => {
//     dispatch(removeFavQuote(quote));
// };

// eslint-disable-next-line import/prefer-default-export
export const setPublicQuotes = () => (dispatch) => {
    axios.get('/quotes')
        .then((response) => {
            // '/quotes/?filter=' + localStorage.getItem('userLogin') + '&type=user'
            //console.log(response.data.quotes);
            // handle success
            dispatch(addPublic(response.data.quotes));
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

export const setFavoriteQuotes = () => (dispatch) => {
    axios.get('/quotes/?filter=' + localStorage.getItem('userLogin') + '&type=user')
        .then((response) => {
            // handle success
            const quotes = response.data.quotes[0].body === 'No quotes found' ? null : response.data.quotes;
            dispatch(addFavorites(quotes));
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
};

const addFavorites = quotes => ({
    type: actionTypes.ADD_FAVORITES,
    quotes: quotes,
})

// const addFavQuote = quote => ({
//     type: actionTypes.ADD_FAV,
//     quote: quote,
// });

// const removeFavQuote = quote => ({
//     type: actionTypes.REMOVE_FAV,
//     quote: quote,
// });

const addPublic = quotes => ({
    type: actionTypes.ADD_PUBLIC,
    quotes: quotes,
});
