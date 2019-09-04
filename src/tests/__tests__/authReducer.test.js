/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable indent */
import reducer from '../../store/authReducer';
import * as actionTypes from '../../store/actionTypes';

describe('auth', () => {
    it('should login in user', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_SUCCESS,
            sessionToken: 'token',
        })).toEqual({
            token: 'token',
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });

    it('should logout user', () => {
        expect(reducer(undefined, {
            type: actionTypes.AUTH_LOGOUT,
        })).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });
    
});