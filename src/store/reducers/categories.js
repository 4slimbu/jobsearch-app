import {CATEGORIES_SET, CATEGORIES_RESET} from "../actions/actionTypes";

const initialState = {};

const categories = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SET:
            console.log('categories set action', action.categories);
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

export default categories;