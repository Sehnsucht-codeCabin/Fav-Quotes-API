/* eslint-disable linebreak-style */
import * as actionTypes from './action-types';

const initialState = {
  favQuotes: [],
  publicQuotes: [],
};

// update state on all actions
const updateState = (oldState, newState) => ({ ...oldState, ...newState });

// my reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {

    // case actionTypes.ADD_FAV:
    //     let oldState = [...state.favQuotes];
    //     let newFavQuotes = oldState.push(action.quote);
    //     return updateState(state, {
    //         favQuotes: newFavQuotes,
    //     });

    case actionTypes.ADD_PUBLIC:
      return updateState(state, {
        publicQuotes: action.quotes,
      });

    case actionTypes.ADD_FAVORITES:
      return updateState(state, {
        favQuotes: action.quotes,
      });


      // case actionTypes.REMOVE_FAV:
      //   return updateState(state, {
      //     token: action.sessionToken,
      //     userId: null,
      //     error: null,
      //     loading: false,
      //   });

    default:
      return state;
  }
};

export default authReducer;