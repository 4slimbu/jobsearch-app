import {
    POSTS_BY_CATEGORY_SET,
    POSTS_BY_CATEGORY_RESET,
    POST_SET,
    POST_COMMENT_SET,
    POSTS_BY_SEARCH_SET, POSTS_BY_ME_SET, POSTS_SAVED_BY_ME_SET
} from "../actions/actionTypes";

const initialState = {
    post: {},
    postsByCategory: {
        data: [],
        links: {},
        meta: {}
    },
    postsByMe: {
        data: [],
        links: {},
        meta: {}
    },
    searchedPosts: {
        data: [],
        links: {},
        meta: {}
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
        case POSTS_BY_CATEGORY_SET:
            return {
                ...state,
                postsByCategory: {
                    data: action.payload.data,
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        case POSTS_BY_SEARCH_SET:
            return {
                ...state,
                searchedPosts: {
                    data: [
                        ...action.payload.data
                    ],
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        case POSTS_BY_ME_SET:
            return {
                ...state,
                postsByMe: {
                    data: state.postsByMe.data.concat(action.payload.data),
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        case POSTS_SAVED_BY_ME_SET:
            return {
                ...state,
                savedPosts: {
                    data: [
                        ...action.payload.data
                    ],
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };
        case POSTS_BY_CATEGORY_RESET:
            return {
                ...state,
                postsByCategory: initialState.postsByCategory
            };
        default:
            return state;
    }
};

export default postsReducers;