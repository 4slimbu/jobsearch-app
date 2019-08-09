import * as axios from "axios";
import appData from "../constants/app";

const API_BASE_URL = appData.app.API_BASE_URL;
/**
 * This handles all the api request.
 *
 * @param type
 * @param url
 * @param userData
 */
const requests = (type, url, userData = {}) => {
    return axios({
        method: type,
        url: url,
        data: userData,
        crossDomain: true,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
    });
};

/**
 * Handles all Auth related requests
 */
const Auth = {
    login: (data) =>
        requests('POST', API_BASE_URL + "/login", data),
    loginAsGuest: (data) =>
        requests('POST', API_BASE_URL + "/register-as-guest", data),
    logout: () =>
        requests('PUT', API_BASE_URL + "/logout"),
    register: (data) =>
        requests('POST', API_BASE_URL + "/register", data),
    forgotPassword: (data) =>
        requests('POST', API_BASE_URL + "/forgot-password", data),
    resetPassword: (data) =>
        requests('PUT', API_BASE_URL + "/reset-password", data),
};

/**
 * Handles all Business related requests
 */
const Users = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/users?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/users/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/users", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/users/" + data.id, data),
    updateMultiple: (data) =>
        requests('PUT', API_BASE_URL + "/users", data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/users", data),
};

/**
 * Handles all Permissions related requests
 */
const Permissions = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/permissions?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/permissions/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/permissions", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/permissions/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/permissions", data),
};

/**
 * Handles all Business related requests
 */
const Roles = {
    all: (query) =>
        requests('GET', API_BASE_URL + "/roles?" + query),
    get: (id) =>
        requests('GET',API_BASE_URL + `/roles/${id}`),
    create: (data) =>
        requests('POST', API_BASE_URL + "/roles", data),
    update: (data) =>
        requests('PUT', API_BASE_URL + "/roles/" + data.id, data),
    deleteMultiple: (data) =>
        requests('DELETE', API_BASE_URL + "/roles", data),
};

/**
 * Handles all Settings related requests
 */
const Settings = {
    all: (data) =>
        requests('GET', API_BASE_URL + "/settings?" + data.query),
};

/**
 * Handles all Currencies related requests
 */
const Currencies = {
    all: (data) =>
        requests('GET', API_BASE_URL + "/currencies?" + data.query),
};

/**
 * Handles all Currencies related requests
 */
const Me = {
    get: (data) =>
        requests('GET', API_BASE_URL + "/me"),
    updateProfile: (data) =>
        requests('PUT', API_BASE_URL + "/me/profile/update", data),
    play: (data) =>
        requests('POST', API_BASE_URL + "/me/play", data),
    getPlayedGames: (data) =>
        requests('GET', API_BASE_URL + "/me/played-games"),
    getTransactions: (data) =>
        requests('GET', API_BASE_URL + "/me/transactions"),
    getWithdrawRequests: (data) =>
        requests('GET', API_BASE_URL + "/me/withdraw-requests"),
    createWithdrawRequest: (data) =>
        requests('POST', API_BASE_URL + "/me/create-withdraw-request", data),
    cancelWithdrawRequest: (data) =>
        requests('PUT', API_BASE_URL + "/me/cancel-withdraw-request/" + data.id),
};

/**
 * Handles all Coinbase related requests
 */
const Coinbase = {
    createCharge: (data) =>
        requests('POST', API_BASE_URL + "/coinbase/create-charge", data),
};

/**
 * Handles all Lottery related requests
 */
const Lottery = {
    slots: {
        all: (query) =>
            requests('GET', API_BASE_URL + "/lottery/slots?" + query),
        get: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/${data.id}?` + data.query),
        create: (data) =>
            requests('POST', API_BASE_URL + "/lottery/slots", data),
        update: (data) =>
            requests('PUT', API_BASE_URL + "/lottery/slots/" + data.id, data),
        winners: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/winners?` + data.query),
        getActive: (data) =>
            requests('GET', API_BASE_URL + `/lottery/slots/3?with=participants&is_active=true`),
        last: (data) =>
            requests('GET',API_BASE_URL + `/lottery/slots/last`),
    }
};

/**
 * Handles all pages related requests
 */
const Pages = {
    get: (data) =>
        requests('GET', API_BASE_URL + "/pages"),
    show: (data) =>
        requests('GET', API_BASE_URL + '/pages/' + data.slug)
};

/**
 * Handles all Contact form related requests
 */
const ContactFormEntry = {
    create: (data) =>
        requests('POST', API_BASE_URL + "/contact", data),
};

export default {
    Auth,
    Users,
    Permissions,
    Me,
    Coinbase,
    Settings,
    Currencies,
    Lottery,
    Pages,
    ContactFormEntry
};
