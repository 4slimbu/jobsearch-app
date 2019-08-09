import {CATEGORIES_SET} from "./actionTypes";
import ApiService from "../../services/ApiService";

export const loadCategories = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Categories.all()
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        reject();
                    }
                    dispatch(setCategories(parsedRes.data));
                    resolve(parsedRes.data);
                })
                .catch(function() {
                    reject();
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