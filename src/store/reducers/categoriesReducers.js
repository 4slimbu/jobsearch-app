import {CATEGORIES_SET, CATEGORIES_RESET} from "../actions/actionTypes";

const initialState = {
    categories: []
};

const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case CATEGORIES_SET:
            return {
                ...state,
                categories: [
                    ...action.categories
                ]
            };
        case CATEGORIES_RESET:
            return {
                ...state,
                categories: initialState.categories
            };

        default:
            return state;
    }
};

export default categoriesReducers;