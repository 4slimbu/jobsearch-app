import {COMMENTS_BY_ME_SET, COMMENTS_BY_ME_UPDATE, POST_COMMENT_SET} from "./actionTypes";
import ApiService from "../../services/ApiService";
import {toQueryString} from "../../utils/helper/helper";

export const saveComment = (commentData) => {
    return (dispatch, getState) => {

        const body = {
            post_id: commentData.post_id,
            comment_body: commentData.comment_body,
            parent_id: commentData.parent_id ? commentData.parent_id : undefined
        };

        ApiService.Comments.save(body)
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
        ApiService.Comments.get(postId)
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

export const getMyComments = (queryObject, url=null) => {
    let isFreshSearch = true;

    let queryString = toQueryString(queryObject);
    return (dispatch, getState) => {
        if (url) {
            isFreshSearch = false;
        }

        return new Promise((resolve, reject) => {
            ApiService.Comments.getMine({url: url, queryString: queryString})
                .then(parsedRes => {
                    if (parsedRes.data) {
                        if (isFreshSearch) {
                            dispatch( setMyComments(parsedRes) );
                        } else {
                            dispatch( updateMyComments(parsedRes) );
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

export const setMyComments = (myComments) => {
    return {
        type: COMMENTS_BY_ME_SET,
        payload: myComments
    }
};

export const updateMyComments = (payload) => {
    return {
        type: COMMENTS_BY_ME_UPDATE,
        payload: payload
    }
};