import setAuthorizationToken from "../utils/axios/setAuthorizationToken";
import jwt_decode from "jwt-decode";
import {
    setEvents, setAppSettings
} from "./appStatusAction";
import {addFlashMessage} from "./flashMessageAction";
import {logout, setAuth} from "./authActions";
import {getCodeMessage} from "../utils/helper/helperFunctions";
import {MESSAGES} from "../constants/messages";
import {addLoadingMessage, deleteLoadingMessage} from "./loadingMessageAction";


export function makeRequest(apiCallFunction, data = {}, options={isSilent: true, message: '...', returnPromise: false}) {
    return dispatch => {
        if (! options.isSilent) dispatch(addLoadingMessage(options.message));
        return new Promise((resolve, reject) => {

            apiCallFunction(data).then(
                (response) => {
                    if (! options.isSilent) dispatch(deleteLoadingMessage());
                    if (response && response.data) {
                        handleSuccessResponseData(dispatch, response.data, options.isSilent);
                        resolve(response.data);
                    }
                    if (response) {
                        resolve(response.data);
                    }
                },
                (error) => {
                    if (! options.isSilent) dispatch(deleteLoadingMessage());
                    if (error && error.response && error.response.data) {
                        handleErrorResponseData(dispatch, error.response.data, options.isSilent);
                        reject(error.response.data)
                    }
                }
            );

        });
    }
}

export function handleSuccessResponseData(dispatch, responseData, isSilent) {
    const token = responseData.token;
    if (token) {
        localStorage.setItem("jwtToken", token);
        setAuthorizationToken(token);
        dispatch(setAuth(jwt_decode(token)));
    }

    if (responseData.events) dispatch(setEvents(responseData.events));

    if (responseData.settings) dispatch(setAppSettings(responseData.settings));

    if (responseData.successCode && responseData.successCode !== 'FETCHED' && responseData.successCode !== 'TRACKED' && !isSilent) {
        dispatch(addFlashMessage({type: "success", text: getCodeMessage(responseData.successCode)}))
    }
}

export function handleErrorResponseData(dispatch, errorData, isSilent) {
    if (errorData.errorCode) {
        if (
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_EXPIRED ||
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_INVALID ||
            getCodeMessage(errorData.errorCode) === MESSAGES.ERR_TOKEN_USER_NOT_FOUND
        ) {
            dispatch(logout());
        }

        if (!isSilent) {
            dispatch(addFlashMessage({type: "error", text: getCodeMessage(errorData.errorCode)}));
        }
    }
}
