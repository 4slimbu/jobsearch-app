import {COMMENTS_BY_ME_SET, POST_COMMENT_SET} from "./actionTypes";
import ApiService from "../../services/ApiService";

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

export const getMyComments = () => {
    return (dispatch, getState) => {
        ApiService.Comments.getMine()
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