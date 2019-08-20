import appData from "../constants/app";
import {uiStartLoading, uiStopLoading} from "../store/actions/uiActions";
import store from "../store/configureStore";
import * as _ from "lodash";
import * as axios from "axios";
import flashMessage from "../components/FlashMessage";

const API_BASE_URL = appData.app.API_BASE_URL;

/**
 * This handles all the api request.
 *
 */
export function callApi(method = 'GET', url, data = {}, headers = null) {
    let axiosArgs = {
        method: method,
        url: url,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        crossDomain: true,
    };

    // Set authorization header if present
    if (store.getState().auth.token) {
        axiosArgs.headers["Authorization"] = "Bearer " + store.getState().auth.token;
    }

    // Send body only if it is present. Also, don't sent body on get as it throws an error
    if (!_.isEmpty(data) && method !== 'GET') {
        // Auto detect form data
        if (data instanceof FormData) {
            axiosArgs.headers["Content-Type"] = "multipart/form-data";
        }
        axiosArgs.data = data;
    }

    // If headers is present, merge with default headers
    if (!_.isEmpty(headers)) {
        axiosArgs.headers = {
            ...axiosArgs.headers,
            ...headers
        }
    }

    return new Promise((resolve, reject) => {
        try {
            store.dispatch(uiStartLoading());
            return axios.request(axiosArgs).then(response => {
                    if (response.data) {
                        resolve(response.data);
                    } else {
                        reject(response);
                    }
                    store.dispatch(uiStopLoading());
                })
                .catch(function (error) {
                    store.dispatch(uiStopLoading());

                    // display alert
                    let errorMessage = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Unknown Error!";
                    flashMessage({title: "Error", body: errorMessage});

                    reject(error);
                });
        } catch (e) {
            store.dispatch(uiStopLoading());

            // display alert
            flashMessage({title: "Error", body: "Network failed!"});

            reject(e);
        }
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
    getMine: (data) =>
        callApi('GET', !data.url ? API_BASE_URL + '/mycomments?' + data.queryString : data.url + data.queryString),
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

/**
 * Handles all pages related requests
 */
const GoogleApis = {
    searchLocation: (searchText) =>
        callApi('GET', "https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" + searchText + "&types=(cities)&key=" + appData.app.GOOGLE_API_KEY),
    geocodeAddress: (address) =>
        callApi('GET', "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + appData.app.GOOGLE_API_KEY),
    reverseGeocodeAddress: (latitude, longitude) =>
        callApi('GET', 'https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=' + appData.app.GOOGLE_API_KEY),
};

export default {
    Auth,
    Me,
    Categories,
    Comments,
    Pages,
    Posts,
    GoogleApis
};
