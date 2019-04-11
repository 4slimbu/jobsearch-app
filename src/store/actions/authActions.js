import { ADD_USER, UPDATE_USER, AUTHENTICATE_USER } from "./actionTypes";

export const addUser = (user) => {
    return {
        type: ADD_USER,
        user: user
    }
};

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user: user
    }
};

export const authenticateUser = (isAuthenticated) => {
    return {
        type: AUTHENTICATE_USER,
        isAuthenticated: isAuthenticated
    }
};