/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
import reducer from '../../store/authReducer';
import * as actionTypes from '../../store/action-types';

describe('auth', () => {

  let initialState;

  beforeEach(() => {
    initialState = {
      token: localStorage.getItem('sessionToken') ? localStorage.getItem('sessionToken') : null,
      userId: null,
      error: null,
      loading: false,
      sessionNotActive: localStorage.getItem('notActiveSession') ? localStorage.getItem('notActiveSession') : 'true',
    };
  });

  it('should login in user', () => {
    expect(reducer(initialState, {
      type: actionTypes.AUTH_SUCCESS,
      payload: {
        token: localStorage.getItem('sessionToken'),
      },
    })).toEqual({
      token: localStorage.getItem('sessionToken'),
      userId: null,
      error: null,
      loading: false,
      sessionNotActive: localStorage.getItem('notActiveSession'),
    });
  });
});