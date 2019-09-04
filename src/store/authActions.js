/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const logInUser = (email, password) => (dispatch) => {
        // the following dispatched action will do just to activate loading
        // dispatch(authStart());

        // now for the async call
        const authData = {
            user: {
                login: email,
                password: password,
              }
        }

        axios
            .post('/session', authData)
            .then((response) => {
                // store token on localStorage
                // const expirationDate = new Date(
                //   new Date().getTime() + response.data.expiresIn * 1000
                // ); // this will give us a fixed datetime: the date at the moment (in milliseconds plus the milliseconds correspondent to the expiration datetime)
                localStorage.setItem('sessionToken', response.data['User-Token']);
                // localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                // async call was success
                dispatch(authSuccess(localStorage.getItem('sessionToken')));
                // dispatch(checkSessionTokenTimeout(localStorage.getItem('expirationDate')));
            })
            .catch((error) => {
                // async call was a failure
                dispatch(authFail(error));
            });
    };

const checkSessionTokenTimeout = expirationTime => (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };

export const logout = () => {

    axios.delete('/session')
    .then((response) => {
        console.log(response.data.message);
    })
    .catch(error => {
        console.log(error);
    });
    // clean localStorage
    localStorage.removeItem('sessionToken');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

const authStart = () => ({
        type: actionTypes.AUTH_START
    });

// here we'll have to get the session token and the user id
const authSuccess = (sessionToken) => ({
        type: actionTypes.AUTH_SUCCESS,
        sessionToken: sessionToken,
        // userId: userId
    });

const authFail = errorObject => ({
        type: actionTypes.AUTH_FAIL,
        error: errorObject
    });

export const setAuthPathRedirect = path => ({
        type: actionTypes.AUTH_PATH_REDIRECT,
        path: path
    });

export const checkIfAuthIsStillValid = () => dispatch => {
        // check if token is still valid
        const token = localStorage.getItem('sessionToken');
        const expirationTime = new Date(localStorage.getItem('expirationDate'));
        if (!token) {
            dispatch(logout());
        } else {
            if (expirationTime > new Date()) {
                const userId = localStorage.getItem('userId');
                // we still have time to wander...
                dispatch(authSuccess(token));
                dispatch(
                    checkSessionTokenTimeout(
                        expirationTime.getTime() - new Date().getTime()
                    )
                ); // MILLISECONDS
            } else {
                dispatch(logout());
            }
        }
    };
