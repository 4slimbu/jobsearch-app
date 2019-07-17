import {
    CATEGORIES_SET, DELETE_SAVED_POST,
    POST_SET,
    POSTS_BY_CATEGORY_SET, POSTS_BY_ME_DELETE,
    POSTS_BY_ME_SET, POSTS_BY_SEARCH_RESET,
    POSTS_BY_SEARCH_SET, POSTS_BY_SEARCH_UPDATE,
    POSTS_SAVED_BY_ME_SET, UPDATE_EDITED_POST
} from "./actionTypes";
import appData from "../../constants/app";

export const getPost = (postId) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/posts/' + postId;

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
                    // dispatch(uiStopLoading());
                })
                .then(res => res.json())
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

export const searchPosts = (text, url=null) => {
    let isFreshSearch = true;

    return (dispatch, getState) => {
        if (!url) {
            url = appData.app.API_BASE_URL + '/posts?search=' + text;
        } else {
            url = url + '&search=' + text;
            isFreshSearch = false;
        }

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
                    }

                    if (isFreshSearch) {
                        dispatch( setPostsBySearch(parsedRes) );
                    } else {
                        dispatch( updatePostsBySearch(parsedRes) );
                    }
                    resolve(parsedRes);
                })
                .catch(err => {
                    reject();
                });
        });

    };
};

export const setPostsBySearch = (payload) => {
    return {
        type: POSTS_BY_SEARCH_SET,
        payload: payload
    }
};

export const updatePostsBySearch = (payload) => {
    return {
        type: POSTS_BY_SEARCH_UPDATE,
        payload: payload
    }
};

export const resetSearchedPosts = () => {
    return {
        type: POSTS_BY_SEARCH_RESET,
        payload: null
    }
};

export const getMyPosts = (url = null) => {
    return (dispatch, getState) => {
        if (!url) {
            url = appData.app.API_BASE_URL + '/posts?type=my';
        }
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

export const getSavedPosts = () => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/posts?type=saved';

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
    return (dispatch, getState) => {
        const token = getState().auth.token;
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
                    resolve(parsedRes);
                })
                .catch(function() {
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