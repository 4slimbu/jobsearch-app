import {CATEGORIES_SET, COMMENTS_BY_ME_SET, POST_COMMENT_SET, POST_SET, POSTS_BY_CATEGORY_SET} from "./actionTypes";
import appData from "../../constants/app";

export const saveComment = (commentData) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/comments';

        const token = getState().auth.token;

        const body = {
            post_id: commentData.post_id,
            comment_body: commentData.comment_body,
            parent_id: commentData.parent_id ? commentData.parent_id : undefined
        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
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
                        getComments(commentData.post_id)
                    );
                }
            })
            .catch(function() {
            });
    };
};

export const getComments = (postId) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/comments/' + postId;

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
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.data) {
                } else {
                    dispatch(
                        setPostComments(parsedRes.data)
                    );
                }
            })
            .catch(function() {
            });
    };
};

export const setPostComments = (postComments) => {
    return {
        type: POST_COMMENT_SET,
        postComments: postComments
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
                alert("Unable to get categories!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.data) {
                    alert("Unable to get categories!");
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

export const getMyComments = () => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/mycomments';

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
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.data) {
                } else {
                    dispatch(
                        setMyComments(parsedRes)
                    );
                }
            })
            .catch(function() {
            });
    };
};

export const setMyComments = (myComments) => {
    return {
        type: COMMENTS_BY_ME_SET,
        payload: myComments
    }
};