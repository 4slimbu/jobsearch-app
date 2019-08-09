import {CATEGORIES_SET, POSTS_BY_CATEGORY_SET} from "./actionTypes";
import appData from "../../constants/app";
import {uiStartLoading} from "./uiActions";

export const loadCategories = () => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/categories';

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
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        reject();
                    }

                    dispatch(setCategories(parsedRes.data));
                    dispatch(uiStartLoading());
                    resolve(parsedRes.data);
                })
                .catch(function() {
                    reject();
                    dispatch(uiStartLoading());
                });
        });

    };
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