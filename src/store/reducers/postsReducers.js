import {
    POST_COMMENT_SET,
    POST_SET,
    RESET_POST_FILTER,
    RESET_POSTS,
    SET_POSTS,
    UPDATE_POST_FILTER,
    UPDATE_POSTS
} from "../actions/actionTypes";

const initialState = {
    post: {},
    posts: {
        data: [],
        links: {},
        meta: {}
    },
    filter: {
        type: "",
        search: "",
        category: [],
        radius: 100,
        orderBy: "nearest", // nearest, latest,
    }
};

const postsReducers = (state = initialState, action) => {
    switch (action.type) {
        case POST_SET:
            return {
                ...state,
                post: action.post
            };

        case POST_COMMENT_SET:
            return {
                ...state,
                post: {
                    ...state.post,
                    postComments: action.postComments
                }
            };

        case SET_POSTS:
            return {
                ...state,
                posts: {
                    data: action.payload.data,
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };

        case UPDATE_POSTS:
            return {
                ...state,
                posts: {
                    data: state.posts.data.concat(action.payload.data),
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };

        case RESET_POSTS:
            return {
                ...state,
                posts: initialState.posts
            };

        case UPDATE_POST_FILTER:
            return {
                ...state,
                filter: {
                    ...state.filter,
                    ...action.payload
                }
            };

        case RESET_POST_FILTER:
            return {
                ...state,
                filter: initialState.filter
            };


        default:
            return state;
    }
};

export default postsReducers;