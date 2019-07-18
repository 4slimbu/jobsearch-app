import {PAGE_SET} from "../actions/actionTypes";

const initialState = {
    pages: [],
};

const pagesReducers = (state = initialState, action) => {
    switch (action.type) {
        case PAGE_SET:
            return {
                ...state,
                pages: [
                    ...state.pages,
                    action.page
                ]
            };

        default:
            return state;
    }
};

export default pagesReducers;