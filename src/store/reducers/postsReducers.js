import {
    POSTS_BY_CATEGORY_SET,
    POSTS_BY_CATEGORY_RESET,
    POST_SET,
    POST_COMMENT_SET,
    POSTS_BY_SEARCH_SET,
    POSTS_BY_ME_SET,
    POSTS_SAVED_BY_ME_SET,
    POSTS_BY_ME_DELETE,
    DELETE_SAVED_POST,
    UPDATE_EDITED_POST, POSTS_BY_SEARCH_UPDATE, POSTS_BY_SEARCH_RESET, POSTS_BY_ME_RESET, POSTS_SAVED_BY_ME_RESET
} from "../actions/actionTypes";
import * as _ from "lodash";

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
    },
    savedPosts: {
        data: [],
        links: {},
        meta: {}
    },
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
                    data: [...action.payload.data],
                    links: action.payload.links,
                    meta: action.payload.meta
                }
            };

        case POSTS_BY_SEARCH_UPDATE:
            return {
                ...state,
                searchedPosts: {
                    data: state.searchedPosts.data.concat(action.payload.data),
                    links: action.payload.links,
                    meta: action.payload.meta
                }
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

        case POSTS_BY_ME_DELETE:
            const myPostsData = [...state.postsByMe.data];
            const myPostsDelIndex = _.find(myPostsData, {id: action.id});

            myPostsData.splice(myPostsDelIndex, 1);

            return {
                ...state,
                postsByMe: {
                    data: myPostsData,
                }
            };

        case DELETE_SAVED_POST:
            const savedPostData = [...state.savedPosts.data];
            const savedPostDelIndex = _.find(savedPostData, {id: action.id});

            savedPostData.splice(savedPostDelIndex, 1);
            return {
                ...state,
                savedPosts: {
                    data: savedPostData,
                }
            };

        default:
            return state;
    }
};

export default postsReducers;