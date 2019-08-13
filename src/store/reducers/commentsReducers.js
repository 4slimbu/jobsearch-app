import {
    COMMENTS_BY_ME_SET, COMMENTS_BY_ME_UPDATE
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
                myComments: {
                    data: action.payload.data,
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        case COMMENTS_BY_ME_UPDATE:
            return {
                ...state,
                myComments: {
                    data: state.myComments.data.concat(action.payload.data),
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        default:
            return state;
    }
};

export default commentReducers;