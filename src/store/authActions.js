/* eslint-disable no-use-before-define */
/* eslint-disable indent */
/* eslint-disable linebreak-style */
/* eslint-disable object-shorthand */
import * as actionTypes from './actionTypes';
import axios from '../../axios-config';

export const logInUser = (email, password) => (dispatch) => {
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
                let expirationDate = new Date();
                expirationDate.setMinutes( expirationDate.getMinutes() + 30 ); // this will give us a fixed datetime: the date at the moment (in milliseconds plus the milliseconds correspondent to the expiration datetime)
                localStorage.setItem('sessionToken', response.data['User-Token']);
                localStorage.setItem('expirationDate', expirationDate);
                // localStorage.setItem('userId', response.data.localId);
                // async call was success
                dispatch(authSuccess(localStorage.getItem('sessionToken')));
                dispatch(checkSessionTokenTimeout(localStorage.getItem('expirationDate')));
            })
            .catch((error) => {
                // async call was a failure
                dispatch(authFail(error));
            });
    };

const checkSessionTokenTimeout = expirationTime => (dispatch) => {
        setTimeout(() => {
            logout(dispatch);
        }, expirationTime);
    };

export const logout = () => (dispatch) => {

    axios.delete('/session')
    .then((response) => {
        console.log(response.data.message);
        dispatch(endSession());
    })
    .catch((error) => {
        console.log(error.data.message);
    }).finally(() => {
        // clean localStorage
        console.log(localStorage.getItem('sessionToken'));
        localStorage.removeItem('sessionToken');
    });
};

const endSession = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

// here we'll have to get the session token and the user id
const authSuccess = (sessionToken) => {
    console.log(axios.defaults.headers);
    //axios.defaults.headers.Authorization = 'Token token=' + sessionToken;
    return {
        type: actionTypes.AUTH_SUCCESS,
        sessionToken: sessionToken,
    }
}; 

const authFail = errorObject => ({
        type: actionTypes.AUTH_FAIL,
        error: errorObject
    });

export const setAuthPathRedirect = path => ({
        type: actionTypes.AUTH_PATH_REDIRECT,
        path: path,
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
