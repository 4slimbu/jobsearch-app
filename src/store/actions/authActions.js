import {AsyncStorage} from "react-native";
import {AUTH_DATA_RESET, AUTH_SET_LOGGED_IN_STATUS, AUTH_SET_TOKEN, AUTH_SET_USER} from "./actionTypes";
import appData from "../../constants/app";
import alertMessage from "../../components/Alert";
import ApiService from "../../services/ApiService";
import * as Facebook from 'expo-facebook';

export const authSetUser = (user) => {
    return {
        type: AUTH_SET_USER,
        user: user,
    };
};

export const authSetLoggedInStatus = (status) => {
    return {
        type: AUTH_SET_LOGGED_IN_STATUS,
        status: status,
    };
};

export const authSetToken = (token, expiryDate) => {
    return {
        type: AUTH_SET_TOKEN,
        token: token,
        expiryDate: expiryDate
    };
};

export const authDataReset = () => {
    return {
        type: AUTH_DATA_RESET
    };
};

export const tryAuth = (authData, authMode = 'login') => {
    let tryAuth = ApiService.Auth.login;
    let body = {};

    if (authMode === "login") {
        body = {
            email: authData.email,
            password: authData.password
        };
    }

    if (authMode === "register") {
        tryAuth = ApiService.Auth.register;

        body = {
            email: authData.email,
            password: authData.password,
            first_name: authData.firstName,
            last_name: authData.lastName,
            gender: authData.gender,
            contact_number: authData.contactNumber,
            device_id: authData.deviceId,
            address: authData.address,
            latitude: authData.latitude,
            longitude: authData.longitude
        };
    }

    if (authMode === "fbLogin") {
        tryAuth = ApiService.Auth.login;
        body = {
            fb_token: authData.fbToken,
            device_id: authData.deviceId
        }
    }
    return dispatch => {
        return new Promise((resolve, reject) => {
            return tryAuth(body)
                .then(parsedRes => {
                    if (!parsedRes.access_token) {
                        if (parsedRes.error === 'UserExistsException' && parsedRes.message) {
                            alertMessage({title: "Error", body: parsedRes.message});
                        } else {
                            alertMessage({title: "Error", body: "Authentication failed, please try again!"});
                        }
                    } else {
                        dispatch(storeAuthInfo(parsedRes));
                    }
                    resolve(parsedRes);
                })
                .catch(err => {
                    reject();
                });
        });
    };
};

export const storeAuthInfo = (res) => {
    return dispatch => {
        // Initialize
        const token = res.access_token;
        const user = res.user;
        const expiresIn = res.expires_in;
        const now = new Date();
        const expiryDate = now.getTime() + expiresIn * 1000;

        // Store user info in Async Storage
        AsyncStorage.setItem("loksewa:auth:user", JSON.stringify(user));
        AsyncStorage.setItem("loksewa:auth:token", token);
        AsyncStorage.setItem("loksewa:auth:expiryDate", expiryDate.toString());

        // Dispatch actions to store Auth info in the redux store
        dispatch(authSetToken(token, expiryDate));
        dispatch(authSetUser(user));
        dispatch(authSetLoggedInStatus(true));
    };
};

export const authGetToken = (dispatch, getState) => {
    return () => {
        return new Promise((resolve, reject) => {
            const token = getState().auth.token;
            const expiryDate = getState().auth.expiryDate;
            if (!token || new Date(expiryDate) <= new Date()) {
                let fetchedToken, fetchedExpiryDate, fetchedUser;
                AsyncStorage.getItem("loksewa:auth:token")
                    .catch(err => reject())
                    .then(tokenFromStorage => {
                        fetchedToken = tokenFromStorage;
                        if (!tokenFromStorage) {
                            reject();
                            return;
                        }
                        return AsyncStorage.getItem("loksewa:auth:expiryDate");
                    })
                    .then(expiryDate => {
                        const parsedExpiryDate = new Date(parseInt(expiryDate));
                        const now = new Date();
                        if (parsedExpiryDate > now) {
                            fetchedExpiryDate = expiryDate;
                            return AsyncStorage.getItem("loksewa:auth:user");
                        } else {
                            reject();
                        }
                    })
                    .then(user => {
                        fetchedUser = JSON.parse(user);

                        // Dispatch actions to store Auth info in the redux store
                        dispatch(authSetToken(fetchedToken, fetchedExpiryDate));
                        dispatch(authSetUser(fetchedUser));
                        dispatch(authSetLoggedInStatus(true));

                        resolve(fetchedToken);
                    })
                    .catch(err => reject());
            } else {
                resolve(token);
            }
        })
    };
};

export const authAutoSignIn = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return dispatch(authGetToken(dispatch, getState)).then((token) => {
                resolve(token);
            }).catch(err => {
                reject();
            });
        })
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("loksewa:auth:token");
        AsyncStorage.removeItem("loksewa:auth:expiryDate");
        AsyncStorage.removeItem("loksewa:auth:user");
        AsyncStorage.removeItem("loksewa:auth:fbToken");
    };
};

export const authLogout = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(authClearStorage());
            dispatch(authDataReset());

            resolve(1);
        }).catch(err => {
            reject();
        });
    };
};

export const facebookLogin = () => async dispatch => {
    let fbToken = await AsyncStorage.getItem('loksewa:auth:fbToken');
    let deviceId = await AsyncStorage.getItem('loksewa:auth:deviceId');
    if (!fbToken) {
        fbToken = await doFacebookLogin(dispatch);
    }
    return dispatch(tryAuth({fbToken: fbToken, deviceId: deviceId}, 'fbLogin'));
};

export const authUpdatePreferences = (preferences) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Me.update({preferences: preferences})
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        alert("Unable to get preferences!");
                    } else {
                        dispatch(authSetUser(parsedRes.data));
                    }
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                });
        });
    };
};

export const verifyEmail = (verificationCode) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return ApiService.Auth.verifyEmail({verificationCode: verificationCode})
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        dispatch(
                            authSetUser(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                });
        });
    };
};

export const sendForgotPasswordEmail = (email) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return ApiService.Auth.forgotPassword({email: email});
        });
    };
};

export const resetPassword = (data) => {
    let body = {
        email: data.email,
        password: data.password,
        token: data.token
    };

    return dispatch => {
        return new Promise((resolve, reject) => {
            return ApiService.Auth.resetPassword(body);
        });
    };
};

export const reSendVerificationCode = () => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Auth.reSendVerificationCode({});
        });
    };
};

export const updateMyProfile = (formData) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Me.update(formData)
                .then(parsedRes => {
                    if (!parsedRes.data) {
                    } else {
                        // Store user info in Async Storage
                        AsyncStorage.setItem("loksewa:auth:user", JSON.stringify(parsedRes.data));

                        dispatch(
                            authSetUser(parsedRes.data)
                        );
                    }
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                });
        });
    };
};

export const updatePassword = (formData) => {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            return ApiService.Me.resetPassword(formData);
        });
    };
};

const doFacebookLogin = async () => {
    const {type, token} = await Facebook.logInWithReadPermissionsAsync(
        appData.app.FB_APP_KEY,
        {permissions: ['public_profile', 'email', 'user_gender', 'user_location']}
    );

    if (type === 'cancel') {
        alertMessage({title: "Cancelled", body: 'Facebook Login Failed!'});
    }

    await AsyncStorage.setItem('loksewa:auth:fbToken', token);

    return token;
};


