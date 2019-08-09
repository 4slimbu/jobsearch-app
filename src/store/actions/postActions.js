import {
    CATEGORIES_SET, DELETE_SAVED_POST,
    POST_SET,
    POSTS_BY_CATEGORY_SET, POSTS_BY_ME_DELETE, POSTS_BY_ME_RESET,
    POSTS_BY_ME_SET, POSTS_BY_SEARCH_RESET,
    SET_POSTS, UPDATE_POSTS, POSTS_SAVED_BY_ME_RESET,
    POSTS_SAVED_BY_ME_SET, RESET_POST_FILTER, UPDATE_EDITED_POST, UPDATE_POST_FILTER, RESET_POSTS
} from "./actionTypes";
import appData from "../../constants/app";
import {toQueryString} from "../../utils/helper/helper";
import {uiStartLoading, uiStopLoading} from "./uiActions";

export const getPost = (postId) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/posts/' + postId;

        const token = getState().auth.token;

        dispatch(uiStartLoading());
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .catch(err => {
                    dispatch(uiStopLoading());
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        dispatch(
                            setPost(parsedRes.data)
                        );
                    }
                    dispatch(uiStopLoading());
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

export const loadPostsByCategory = (categoryId) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/posts?category=' + categoryId;

        const token = getState().auth.token;

        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .catch(err => {
                alert("Unable to get categoriesReducers!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.data) {
                    alert("Unable to get categoriesReducers!");
                } else {
                    dispatch(
                        setPostsByCategory(parsedRes)
                    );
                }
            })
            .catch(function() {
            });
    };
};

export const setCategories = (categories) => {
    return {
        type: CATEGORIES_SET,
        categories: categories
    }
};

export const setPostsByCategory = (payload) => {
    return {
        type: POSTS_BY_CATEGORY_SET,
        payload: payload
    }
};

export const getPosts = (queryObject, url=null) => {
    let isFreshSearch = true;

    let queryString = toQueryString(queryObject);
    return (dispatch, getState) => {
        if (!url) {
            url = appData.app.API_BASE_URL + '/posts?' + queryString;
        } else {
            url = url + queryString;
            isFreshSearch = false;
        }

        dispatch(uiStartLoading());

        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .catch(err => {
                    dispatch(uiStartLoading());
                    reject();
                })
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        reject();
                    }

                    if (isFreshSearch) {
                        dispatch( setPosts(parsedRes) );
                    } else {
                        dispatch( updatePosts(parsedRes) );
                    }
                    dispatch(uiStartLoading());
                    resolve(parsedRes);
                })
                .catch(err => {
                    dispatch(uiStartLoading());
                    reject();
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

export const resetSearchedPosts = () => {
    return {
        type: POSTS_BY_SEARCH_RESET,
        payload: null
    }
};

export const getMyPosts = (url = null, query = null) => {
    return (dispatch, getState) => {
        if (!url) {
            url = appData.app.API_BASE_URL + '/posts?type=my';
        }

        if (query) {
            url = url + query
        }

        console.log(url);
        const token = getState().auth.token;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        reject();
                    } else {
                        dispatch(
                            setPostsByMe(parsedRes)
                        );
                        resolve(parsedRes);
                    }
                })
                .catch(function() {
                    reject();
                });
        });
    };
};

export const setPostsByMe = (payload) => {
    return {
        type: POSTS_BY_ME_SET,
        payload: payload
    }
};

export const getSavedPosts = (url = null, query = null) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/posts?type=saved';

        if (query) {
            url = url + query
        }

        const token = getState().auth.token;
        console.log(url);
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .catch(err => {
                alert("Unable to search posts!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.data) {
                    alert("Unable to search posts!");
                } else {
                    dispatch(
                        setPostsSavedByMe(parsedRes)
                    );
                }
            })
            .catch(function() {
            });
    };
};

export const setPostsSavedByMe = (payload) => {
    return {
        type: POSTS_SAVED_BY_ME_SET,
        payload: payload
    }
};

export const addPost = (formData) => {
    let url = appData.app.API_BASE_URL + '/posts';
    console.log(formData, url);
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(uiStartLoading());
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then((res) => {
                    console.log(res);
                    dispatch(uiStopLoading());
                    resolve();
                })
                .catch(function () {
                    dispatch(uiStopLoading());
                    reject();
                    console.log("error");
                });
        });
    };
};

export const deletePost = (id = 0) => {
    let url = appData.app.API_BASE_URL + '/posts/' + id;

    return (dispatch, getState) => {
        const token = getState().auth.token;

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                // .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.error) {
                        dispatch(deleteMyPost(id));
                    }
                    resolve(parsedRes);
                })
                .catch(err => reject(err));
        });
    };
};

export const deleteMyPost = (id) => {
    return {
        type: POSTS_BY_ME_DELETE,
        id: id
    }
};

export const deleteSavedPost = (id) => {
    return {
        type: DELETE_SAVED_POST,
        id: id
    }
};

export const updatePost = (postId, formData) => {
    let url = appData.app.API_BASE_URL + '/posts/' + postId;
    return (dispatch, getState) => {
        const token = getState().auth.token;
        dispatch(uiStartLoading());
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        dispatch(
                            getMyPosts()
                        );
                    }
                    dispatch(uiStopLoading());
                    resolve(parsedRes);
                })
                .catch(function() {
                    dispatch(uiStopLoading());
                    reject();
                });
        });
    };
};

export const updateEditedPost = (post) => {
    return {
        type: UPDATE_EDITED_POST,
        post: post
    }
};

export const resetPostsByMe = (payload) => {
    return {
        type: POSTS_BY_ME_RESET,
        payload: payload
    }
};

export const resetSavedPosts = (payload) => {
    return {
        type: POSTS_SAVED_BY_ME_RESET,
        payload: payload
    }
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
    let url = appData.app.API_BASE_URL + '/posts/flag/' + postId;
    return (dispatch, getState) => {
        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                });
        });
    };
};