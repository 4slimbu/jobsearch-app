import {CATEGORIES_SET} from "./actionTypes";
import ApiService from "../../services/ApiService";

export const loadCategories = (returnPromise = false) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Categories.all()
                .then(parsedRes => {
                    if (parsedRes.data) {
                        dispatch(setCategories(parsedRes.data));
                    }
                    returnPromise && resolve(parsedRes.data);
                })
                .catch(function() {
                    returnPromise && reject();
                });
        });

    };
};

export const setCategories = (categories) => {
    return {
        type: CATEGORIES_SET,
        categories: categories
    }
};