/* eslint-disable linebreak-style */
import * as actionTypes from './action-types';

const initialState = {
  token: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
  userId: null,
  error: null,
  loading: false,
  sessionNotActive: localStorage.getItem('notActiveSession') ? localStorage.getItem('notActiveSession') : 'true',
};

// update state on all actions
const updateState = (oldState, newState) => ({ ...oldState, ...newState });

// my reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return updateState(state, {
        token: action.payload.token,
        sessionNotActive: localStorage.getItem('notActiveSession'),
      });

    case actionTypes.AUTH_FAIL:
      return updateState(state, {
        loading: false,
      });

    case actionTypes.AUTH_LOGOUT:
      return updateState(state, {
        token: null,
        sessionNotActive: localStorage.getItem('notActiveSession') ? localStorage.getItem('notActiveSession') : 'true',
      });

    case actionTypes.NOT_ACTIVE_SESSION:
      return updateState(state, {
        sessionNotActive: localStorage.getItem('notActiveSession'),
      });

    default:
      return state;
  }
};

export default authReducer;
