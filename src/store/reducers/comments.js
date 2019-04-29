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

const posts = (state = initialState, action) => {
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

export default posts;