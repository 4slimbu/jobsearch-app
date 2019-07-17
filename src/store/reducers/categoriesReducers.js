import {CATEGORIES_SET, CATEGORIES_RESET} from "../actions/actionTypes";

const initialState = {};

const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SET:
            return {
                ...state,
                ...action.categories
            };
        case CATEGORIES_RESET:
            return {
                ...state,
                ...initialState
            };

        default:
            return state;
    }
};

export default categoriesReducers;