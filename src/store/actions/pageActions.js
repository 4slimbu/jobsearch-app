import {} from "./actionTypes";
import appData from "../../constants/app";
import {PAGE_SET} from "./actionTypes";

export const getPage = (pageSlug) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/pages/' + pageSlug;

        const token = getState().auth.token;

        console.log(url);
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
                    console.log('Get Page Error', err);
                    // dispatch(uiStopLoading());
                })
                .then(res => {
                    console.log(res);
                    return res.json();
                })
                .then(parsedRes => {
                    console.log(parsedRes);
                    if (!parsedRes.data) {
                        console.log('Get Page Error', err);
                    } else {
                        dispatch(
                            setPage(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                    console.log("error");
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
