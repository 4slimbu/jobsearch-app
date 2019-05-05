import {
    COMMENTS_BY_ME_SET
} from "../actions/actionTypes";

const initialState = {
    myComments: {
        data: [],
        links: {},
        meta: {}
    },
};

const commentReducers = (state = initialState, action) => {
    switch (action.type) {
        case COMMENTS_BY_ME_SET:
            return {
                ...state,
                myComments: action.payload
            };
        default:
            return state;
    }
};

export default commentReducers;