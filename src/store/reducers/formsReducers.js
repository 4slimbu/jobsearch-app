import {
    RESET_CATEGORY,
    RESET_LOCATION, RESET_REGISTER_FORM, SET_CATEGORY, SET_LOCATION,
    UPDATE_REGISTER_FORM
} from "../actions/actionTypes";

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
    },
    category: {}
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
        case SET_CATEGORY:
            return {
                ...state,
                category: action.category
            };
        case RESET_CATEGORY:
            return {
                ...state,
                category: initialState.category
            };
        default:
            return state;
    }
};

export default formsReducers;