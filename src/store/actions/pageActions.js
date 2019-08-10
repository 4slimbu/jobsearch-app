import {PAGE_SET} from "./actionTypes";
import ApiService from "../../services/ApiService";

export const getPage = (pageSlug) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            ApiService.Pages.get(pageSlug)
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        dispatch(
                            setPage(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                });
        })
    };
};

export const setPage = (page) => {
    return {
        type: PAGE_SET,
        page: page
    }
};
