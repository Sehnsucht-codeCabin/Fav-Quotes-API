/* eslint-disable linebreak-style */
import * as actionTypes from './actionTypes';

const initialState = {
  token: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/',
};

// update state on all actions
const updateState = (oldState, newState) => ({ ...oldState, ...newState });

// my reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // case actionTypes.AUTH_START:
    //   return updateState(state, {
    //     error: null,
    //     loading: true,
    //   });

    case actionTypes.AUTH_SUCCESS:
      return updateState(state, {
        token: action.sessionToken,
        userId: null,
        error: null,
        loading: false,
      });

    case actionTypes.AUTH_FAIL:
      return updateState(state, {
        error: action.error,
        loading: false,
      });

    case actionTypes.AUTH_LOGOUT:
      return updateState(state, {
        token: state.token,
        userId: null,
      });

    case actionTypes.AUTH_PATH_REDIRECT:
      return updateState(state, {
        authRedirectPath: action.path,
      });

    default:
      return state;
  }
};

export default authReducer;