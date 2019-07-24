import {RESET_LOCATION, RESET_REGISTER_FORM, SET_LOCATION, UPDATE_REGISTER_FORM} from "./actionTypes";

export const updateRegisterForm = (data) => {
    return {
        type: UPDATE_REGISTER_FORM,
        payload: data
    }
};

export const resetRegisterForm = () => {
    return {
        type: RESET_REGISTER_FORM,
        payload: {}
    }
};

export const setLocation = (location) => {
    return {
        type: SET_LOCATION,
        location: location
    }
};

export const resetLocation = () => {
    return {
        type: RESET_LOCATION,
        payload: {}
    }
};