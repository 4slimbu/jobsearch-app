import {
    AUTH_DATA_RESET,
    AUTH_REMOVE_TOKEN,
    AUTH_SET_LOGGED_IN_STATUS,
    AUTH_SET_TOKEN,
    AUTH_SET_USER,
    FACEBOOK_LOGIN_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    token: null,
    expiryDate: null,
    user: {
        first_name: null,
        last_name: null,
        gender: null,
        contact_number: null,
        preferences: {},
        verified: false
    },
    isLoggedIn: false
};

const authReducers = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_DATA_RESET:
            return {
                ...initialState
            };
        case AUTH_SET_TOKEN:
            return {
                ...state,
                token: action.token,
                expiryDate: action.expiryDate
            };
        case AUTH_REMOVE_TOKEN:
            return {
                ...state,
                token: null,
                expiryDate: null
            };
        case AUTH_SET_USER:
            return {
                ...state,
                user: action.user
            };
        case AUTH_SET_LOGGED_IN_STATUS:
            return {
                ...state,
                isLoggedIn: action.status,
            };
        case FACEBOOK_LOGIN_SUCCESS:
            return {
                ...state,
                fb_token: action.status,
            };
        default:
            return state;
    }
};

export default authReducers;
