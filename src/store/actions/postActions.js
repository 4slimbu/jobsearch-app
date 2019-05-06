import {
    CATEGORIES_SET, DELETE_SAVED_POST,
    POST_SET,
    POSTS_BY_CATEGORY_SET, POSTS_BY_ME_DELETE,
    POSTS_BY_ME_SET,
    POSTS_BY_SEARCH_SET,
    POSTS_SAVED_BY_ME_SET, UPDATE_EDITED_POST
} from "./actionTypes";
import {API_BASE_URL} from "../../constants/app";

export const getPost = (postId) => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/posts/' + postId;

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
                    console.log('Get Post Error', err);
                    // dispatch(uiStopLoading());
                })
                .then(res => res.json())
                .then(parsedRes => {
                    console.log(parsedRes);
                    if (!parsedRes.data) {
                        console.log('Get Post Error', err);
                    } else {
                        dispatch(
                            setPost(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                    console.log("error");
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
        let url = API_BASE_URL + '/posts?category=' + categoryId;

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
                console.log(err);
                alert("Unable to get categoriesReducers!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    alert("Unable to get categoriesReducers!");
                } else {
                    dispatch(
                        setPostsByCategory(parsedRes)
                    );
                }
            })
            .catch(function() {
                console.log("error");
            });
    };
};

export const setCategories = (categories) => {
    console.log('setCategories', categories);
    return {
        type: CATEGORIES_SET,
        categories: categories
    }
};

export const setPostsByCategory = (payload) => {
    console.log('setPostsByCategory', payload);
    return {
        type: POSTS_BY_CATEGORY_SET,
        payload: payload
    }
};

export const searchPosts = (text) => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/posts?search=' + text;

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
                console.log(err);
                alert("Unable to search posts!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    alert("Unable to search posts!");
                } else {
                    dispatch(
                        setPostsBySearch(parsedRes)
                    );
                }
            })
            .catch(function() {
                console.log("error");
            });
    };
};

export const setPostsBySearch = (payload) => {
    console.log('setPostsBySearch', payload);
    return {
        type: POSTS_BY_SEARCH_SET,
        payload: payload
    }
};

export const getMyPosts = (url = null) => {
    return (dispatch, getState) => {
        if (!url) {
            url = API_BASE_URL + '/posts?type=my';
        }
        console.log('get my posts url', url);
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
                    console.log(parsedRes);
                    if (!parsedRes.data) {
                        console.log("Unable to get posts!");
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
                    console.log("error");
                });
        });
    };
};

export const setPostsByMe = (payload) => {
    console.log('setPostsByMe', payload);
    return {
        type: POSTS_BY_ME_SET,
        payload: payload
    }
};

export const getSavedPosts = () => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/posts?type=saved';

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
                console.log(err);
                alert("Unable to search posts!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    alert("Unable to search posts!");
                } else {
                    dispatch(
                        setPostsSavedByMe(parsedRes)
                    );
                }
            })
            .catch(function() {
                console.log("error");
            });
    };
};

export const setPostsSavedByMe = (payload) => {
    console.log('setPostsByMe', payload);
    return {
        type: POSTS_SAVED_BY_ME_SET,
        payload: payload
    }
};

export const addPost = (formData) => {
    let url = API_BASE_URL + '/posts';
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
                    console.log(res);
                    resolve();
                })
                .catch(function () {
                    reject();
                    console.log("error");
                });
        });
    };
};

export const deletePost = (id = 0) => {
    let url = API_BASE_URL + '/posts/' + id;

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
                    console.log(parsedRes);
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
    let url = API_BASE_URL + '/posts/' + postId;
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
                    console.log('update post response', parsedRes);
                    if (!parsedRes.data) {
                        console.log('Get Post Error', err);
                    } else {
                        dispatch(
                            getMyPosts()
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                    console.log("error");
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