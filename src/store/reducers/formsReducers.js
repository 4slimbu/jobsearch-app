import {RESET_LOCATION, RESET_REGISTER_FORM, SET_LOCATION, UPDATE_REGISTER_FORM} from "../actions/actionTypes";

const initialState = {
    register: {
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        gender: "male",
        contactNumber: "",
        errors: {}
    },
    location: {
        address: "",
        latitude: "",
        longitude: ""
    }
};

const formsReducers = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_REGISTER_FORM:
            return {
                ...state,
                register: {
                    ...state.register,
                    ...action.payload
                }
            };
        case RESET_REGISTER_FORM:
            return {
                ...state,
                register: initialState.register
            };
        case SET_LOCATION:
            return {
                ...state,
                location: action.location
            };
        case RESET_LOCATION:
            return {
                ...state,
                location: initialState.location
            };

        default:
            return state;
    }
};

export default formsReducers;