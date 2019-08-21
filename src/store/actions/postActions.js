import {
    POST_SET,
    RESET_POST_FILTER,
    RESET_POSTS,
    SET_POSTS,
    UPDATE_POST_FILTER,
    UPDATE_POSTS
} from "./actionTypes";
import {toQueryString} from "../../utils/helper/helper";
import ApiService from "../../services/ApiService";

export const getPost = (postId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Posts.get(postId)
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        dispatch(
                            setPost(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                });
        })
    };
};

export const setPost = (post) => {
    return {
        type: POST_SET,
        post: post
    }
};

export const getPosts = (queryObject, url=null) => {
    let isFreshSearch = true;

    let queryString = toQueryString(queryObject);
    return (dispatch, getState) => {
        if (url) {
            isFreshSearch = false;
        }

        return new Promise((resolve, reject) => {
            ApiService.Posts.all({url: url, queryString: queryString})
                .then(response => {
                    if (response.data) {
                        if (isFreshSearch) {
                            dispatch( setPosts(response) );
                        } else {
                            dispatch( updatePosts(response) );
                        }
                        // resolve(parsedRes);
                    } else {
                        // reject();
                    }
                })
                .catch(err => {
                    // reject();
                });
        });

    };
};

export const setPosts = (payload) => {
    return {
        type: SET_POSTS,
        payload: payload
    }
};

export const updatePosts = (payload) => {
    return {
        type: UPDATE_POSTS,
        payload: payload
    }
};

export const resetPosts = () => {
    return {
        type: RESET_POSTS,
        payload: null
    }
};

export const addPost = (formData) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Posts.add(formData)
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(err => reject(err));
        });
    };
};

export const deletePost = (id = 0) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Posts.delete(id)
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(err => reject(err));
        });
    };
};

export const updatePost = (postId, formData) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Posts.update(postId, formData)
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                });
        });
    };
};

export const updatePostFilter = (payload) => {
    return {
        type: UPDATE_POST_FILTER,
        payload: payload
    }
};

export const resetPostFilter = () => {
    return {
        type: RESET_POST_FILTER,
        payload: {}
    }
};

export const flagPost = (postId) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Posts.flagPost(postId);
        });
    };
};