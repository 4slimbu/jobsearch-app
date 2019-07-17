import {} from "./actionTypes";
import appData from "../../constants/app";
import {PAGE_SET} from "./actionTypes";

export const getPage = (pageSlug) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/pages/' + pageSlug;

        const token = getState().auth.token;

        return new Promise((resolve, reject) => {
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
                .then(res => {
                    return res.json();
                })
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
