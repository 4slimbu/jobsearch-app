import {CATEGORIES_SET, POSTS_BY_CATEGORY_SET} from "./actionTypes";
import {API_BASE_URL} from "../../constants/app";

export const loadCategories = (dispatch, getState) => {
    return () => {
        let url = API_BASE_URL + '/categories';

        const token = getState().auth.token;
        console.log('load categories', token);
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .catch(err => {
                console.log('Category Fetch Error', err);
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes);
                if (!parsedRes.data) {
                    console.log('Category Fetch Error', err);
                } else {
                    dispatch(
                        setCategories(parsedRes.data)
                    );
                }
            })
            .catch(function() {
                console.log("error");
            });
    };
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