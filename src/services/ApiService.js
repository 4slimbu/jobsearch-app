import appData from "../constants/app";
import {uiStartLoading, uiStopLoading} from "../store/actions/uiActions";
import store from "../store/configureStore";

const API_BASE_URL = appData.app.API_BASE_URL;

/**
 * This handles all the api request.
 *
 */
export function callApi(method = 'GET', url, data = {}) {
    let headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    if (store.getState().auth.token) {
        headers.Authorization = "Bearer " + store.getState().auth.token;
    }

    let fetchArgs = {
        method: method,
        headers: headers
    };

    if (data.length > 0 && method !== 'GET') {
        fetchArgs.body = JSON.stringify(data);
    }

    store.dispatch(uiStartLoading());
    return new Promise((resolve, reject) => {
        return fetch(url, fetchArgs)
            .then(res => {
                return res.json();
            })
            .then(parsedRes => {
                store.dispatch(uiStopLoading());
                resolve(parsedRes);
            })
            .catch(function (error) {
                console.log(url, fetchArgs, error);
                store.dispatch(uiStopLoading());
                reject();
            });
    });
}

/**
 * Handles all Auth related requests
 */
const Auth = {
    login: (data) =>
        callApi('POST', API_BASE_URL + "/login", data),
    register: (data) =>
        callApi('POST', API_BASE_URL + "/register", data),
    verifyEmail: (data) =>
        callApi('PUT', API_BASE_URL + "/register-as-guest/" + data.verificationCode),
    forgotPassword: (data) =>
        callApi('POST', API_BASE_URL + "/forgot-password", data),
    resetPassword: (data) =>
        callApi('PUT', API_BASE_URL + "/reset-password", data),
    reSendVerificationCode: (data) =>
        callApi('GET', API_BASE_URL + "/resend-verification-code", data),
    logout: () =>
        callApi('PUT', API_BASE_URL + "/logout"),

};

/**
 * Handles all Currencies related requests
 */
const Me = {
    get: (data) =>
        callApi('GET', API_BASE_URL + "/me"),
    update: (data) =>
        callApi('POST', API_BASE_URL + "/me", data),
    resetPassword: (data) =>
        callApi('PUT', API_BASE_URL + "/me/reset-password", data),
};

/**
 * Handles all Categories related requests
 */
const Categories = {
    all: (data) =>
        callApi('GET', API_BASE_URL + "/categories", data),
};

/**
 * Handles all Comments related requests
 */
const Comments = {
    get: (postId) =>
        callApi('GET', API_BASE_URL + "/comments/" + postId),
    getMine: () =>
        callApi('GET', API_BASE_URL + "/mycomments"),
    save: (data) =>
        callApi('POST', API_BASE_URL + "/comments", data),
};

/**
 * Handles all pages related requests
 */
const Pages = {
    all: (data) =>
        callApi('GET', API_BASE_URL + "/pages"),
    get: (pageSlug) =>
        callApi('GET', API_BASE_URL + '/pages/' + pageSlug)
};

/**
 * Handles all pages related requests
 */
const Posts = {
    all: (data) =>
        callApi('GET', !data.url ? API_BASE_URL + '/posts?' + data.queryString : data.url + data.queryString),
    get: (postId) =>
        callApi('GET', API_BASE_URL + '/posts/' + postId),
    add: (data) =>
        callApi('POST', API_BASE_URL + '/posts', data),
    update: (postId, data) =>
        callApi('POST', API_BASE_URL + '/posts/' + postId, data),
    delete: (postId) =>
        callApi('DELETE', API_BASE_URL + '/posts/' + postId),
    flagPost: (postId) =>
        callApi('GET', API_BASE_URL + '/posts/flag/' + postId)
};

export default {
    Auth,
    Me,
    Categories,
    Comments,
    Pages,
    Posts,
};
