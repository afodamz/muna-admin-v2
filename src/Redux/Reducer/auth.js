import * as actionTypes from '../Actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    token: null,
    error: false, 
    loading: false,
    errorMessage: ''
}

const authStart = (state, action) => {
    return updateObject(state, {
        error: false,
        loading: true,
    });
}

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.token,
        error: false,
        loading: false
    });
}

const authFail = (state, action) => {
    return updateObject(state, {
        error: action.error,
        loading: false
    });
}

const authLogout = (state, action) => {
    return updateObject(state, {
        token: null
    });
}

const authError = (state, action) => {
    return updateObject(state, {
        error: true,
        errorMessage: "Incorrect Login or Password"
    });
}

const authreducer = (state=initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_ERROR: return authError(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default:
            return state;
    }
}

export default authreducer;