import axios from 'axios';
import * as actionTypes from './actionTypes';
import { SetAlert } from "./AlertAction";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = token => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token
    }
}

export const authFail = error => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const authError = () => {
    return {
        type: actionTypes.AUTH_ERROR
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000)
    }
}

export const authLogin = (email, password, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://munaproverb.herokuapp.com/accounts/login/', {
            email: email,
            password: password
        })
        .then(res => {
            // console.log(res.data);
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            history.push('/');
        
        })
        .catch(err => {
            console.log(err.message);
            dispatch(SetAlert({ successType: false, alertMsg: "Username or Password Error!" }));
            // alert("Error");
            // dispatch(authError());
            // dispatch(authFail(err.message));
        });
    }
}

export const authSignup = (email, firstname, lastname, password, password1, history) => {
    return dispatch => {
        dispatch(authStart());
        axios.post('https://munaproverb.herokuapp.com/accounts/registration/', {
            email: email,
            first_name: firstname,
            last_name: lastname,
            password: password,
            password2: password1
        })
        .then(res => {
            const token = res.data.token;
            const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeout(3600));
            history.push('/');
        })
        .catch(err => {
            // alert(err.message);
            // console.log(err.response.data);
            dispatch(SetAlert({ successType: false, alertMsg: err.response.data.email }));
            // alert(err.response.data.email);
            // console.log(err.message);
            // console.log(err.request);
            // console.log(err.response.status);
            // console.log(err.response.headers);
            // dispatch(authFail(err))
        })
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (token === undefined) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if ( expirationDate <= new Date() ) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000) );
            }
        }
    }
}
