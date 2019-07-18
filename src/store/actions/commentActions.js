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

        console.log('comment body', body);
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
                console.log('Save comment error: ', err);
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    console.log('Category Fetch Error', err);
                } else {
                    console.log('post_id', commentData.post_id);
                    console.log('Comment saved response', parsedRes);
                    dispatch(
                        getComments(commentData.post_id)
                    );
                }
            })
            .catch(function() {
                console.log("error");
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
                console.log('Get comment error: ', err);
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    console.log('Get comment error', err);
                } else {
                    dispatch(
                        setPostComments(parsedRes.data)
                    );
                }
            })
            .catch(function() {
                console.log("error");
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
                console.log(err);
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
                console.log("error");
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
                console.log('Get comment error: ', err);
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    console.log('Get comment error', err);
                } else {
                    dispatch(
                        setMyComments(parsedRes)
                    );
                }
            })
            .catch(function() {
                console.log("error");
            });
    };
};

export const setMyComments = (myComments) => {
    return {
        type: COMMENTS_BY_ME_SET,
        payload: myComments
    }
};