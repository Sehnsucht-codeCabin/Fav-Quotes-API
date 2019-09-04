/* eslint-disable linebreak-style */
import * as actionTypes from './actionTypes';

const initialState = {
    favQuotes: [],
    publicQuotes: [],
};

// update state on all actions
const updateState = (oldState, newState) => ({ ...oldState, ...newState });

// my reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_FAV:
            let oldState = [...state.favQuotes];
            let newFavQuotes = oldState.push(action.quote);
            return updateState(state, {
                favQuotes: newFavQuotes,
            });

        case actionTypes.ADD_PUBLIC:
            let newPublicQuotes = action.quotes;
            return updateState(state, {
                publicQuotes: newPublicQuotes,
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