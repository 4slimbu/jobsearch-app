import { ADD_USER, UPDATE_USER, AUTHENTICATE_USER } from "../actions/actionTypes";

const initialState = {
    auth: {
        access_token: '',
        expires_in: '',
        token_type: 'bearer',
        user: {},
        isAuthenticated: false
    }
};

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: action.user
                }
            };
        case UPDATE_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    user: {
                        ...state.auth.user,
                        ...action.user
                    }
                }
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                auth: {
                    ...state.auth,
                    isAuthenticated: action.isAuthenticated
                }
            };
        default:
            return state;
    }
};

export default mainReducer;