import {
    POSTS_BY_CATEGORY_SET,
    POSTS_BY_CATEGORY_RESET,
    POST_SET,
    POST_COMMENT_SET,
    SET_POSTS,
    POSTS_BY_ME_SET,
    POSTS_SAVED_BY_ME_SET,
    POSTS_BY_ME_DELETE,
    DELETE_SAVED_POST,
    UPDATE_EDITED_POST, UPDATE_POSTS, POSTS_BY_SEARCH_RESET, POSTS_BY_ME_RESET, POSTS_SAVED_BY_ME_RESET,
    UPDATE_POST_FILTER, RESET_POST_FILTER, RESET_POSTS
} from "../actions/actionTypes";
import * as _ from "lodash";

const initialState = {
    post: {},
    posts: {
        data: [],
        links: {},
        meta: {}
    },
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
    },
    savedPosts: {
        data: [],
        links: {},
        meta: {}
    },
    filter: {
        type: "",
        search: "",
        category: [],
        radius: "",
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

        case POSTS_BY_CATEGORY_SET:
            return {
                ...state,
                postsByCategory: {
                    data: action.payload.data,
                    links: action.payload.links,
                    meta: action.payload.meta
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

        case POSTS_BY_SEARCH_RESET:
            return {
                ...state,
                searchedPosts: initialState.searchedPosts
            };

        case POSTS_BY_ME_RESET:
            return {
                ...state,
                postsByMe: initialState.postsByMe
            };

        case POSTS_SAVED_BY_ME_RESET:
            return {
                ...state,
                savedPosts: initialState.savedPosts
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