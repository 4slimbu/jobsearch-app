import {
    CATEGORIES_SET,
    POST_SET,
    POSTS_BY_CATEGORY_SET,
    POSTS_BY_ME_SET,
    POSTS_BY_SEARCH_SET,
    POSTS_SAVED_BY_ME_SET
} from "./actionTypes";
import {API_BASE_URL} from "../../constants/app";

export const getPost = (postId) => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/posts/' + postId;

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
            })
            .catch(function() {
                console.log("error");
            });
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
                alert("Unable to get categories!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    alert("Unable to get categories!");
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

export const getMyPosts = () => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/posts?type=my';

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
                        setPostsByMe(parsedRes)
                    );
                }
            })
            .catch(function() {
                console.log("error");
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