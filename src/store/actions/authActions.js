import {AsyncStorage} from "react-native";
import {AUTH_DATA_RESET, AUTH_SET_LOGGED_IN_STATUS, AUTH_SET_TOKEN, AUTH_SET_USER} from "./actionTypes";
import appData from "../../constants/app";
import alertMessage from "../../components/Alert";

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
    let url = appData.app.API_BASE_URL + '/login';
    let body = {};

    if (authMode === "login") {
        body = {
            email: authData.email,
            password: authData.password
        };
    }

    if (authMode === "register") {
        url = appData.app.API_BASE_URL + '/register';

        body = {
            email: authData.email,
            password: authData.password,
            first_name: authData.firstName,
            last_name: authData.lastName,
            gender: authData.gender,
            contact_number: authData.contactNumber,
            device_id: authData.deviceId
        };
    }

    if (authMode === "fbLogin") {
        url = appData.app.API_BASE_URL + '/login';
        body = {
            fb_token: authData.fbToken,
            device_id: authData.deviceId
        }
    }

    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(res => {
                    return res.json();
                })
                .then(parsedRes => {
                    if (!parsedRes.access_token) {
                        if (parsedRes.error === 'UserExistsException' && parsedRes.message) {
                            alertMessage({ title: "Error", body: parsedRes.message });
                        } else {
                            alertMessage({ title: "Error", body: "Authentication failed, please try again!" });
                        }
                    } else {
                        dispatch( storeAuthInfo(parsedRes) );
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

    if (! fbToken) {
        fbToken = await doFacebookLogin(dispatch);
    }

    return dispatch(tryAuth({fbToken: fbToken, deviceId: deviceId}, 'fbLogin'));
};

export const authUpdatePreferences = (preferences) => {
    return (dispatch, getState) => {
        let url = appData.app.API_BASE_URL + '/me';

        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify({preferences: preferences}),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    if (!parsedRes.data) {
                        alert("Unable to get preferences!");
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
        })
    };
};

export const verifyEmail = (verificationCode) => {
    let url = appData.app.API_BASE_URL + '/verify-email/' + verificationCode;
    return dispatch => {

        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .catch(err => {
                })
                .then(res => res.json())
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
    let url = appData.app.API_BASE_URL + '/forgot-password';
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: JSON.stringify({email: email}),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                });
        });
    };
};

export const resetPassword = (data) => {
    let url = appData.app.API_BASE_URL + '/reset-password';
    return dispatch => {
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify({
                    email: data.email,
                    password: data.password,
                    token: data.token
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(res => res.json())
                .then((parsedRes) => {
                    if (parsedRes.error) {
                        reject();
                    }
                    resolve();
                })
                .catch(err => {
                    reject();
                });
        });
    };
};

export const reSendVerificationCode = () => {
    let url = appData.app.API_BASE_URL + '/resend-verification-code';
    return (dispatch, getState) => {
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
                // .then(res => res.json())
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                });
        });
    };
};

export const updateMyProfile = (formData) => {
    let url = appData.app.API_BASE_URL + '/me';
    return (dispatch, getState) => {
        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
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
                .catch(function() {
                    reject();
                });
        });
    };
};

export const updatePassword = (formData) => {
    let url = appData.app.API_BASE_URL + '/me/reset-password';
    return (dispatch, getState) => {
        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                // .then(res => res.json())
                .then(parsedRes => {
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                });
        });
    };
};

const doFacebookLogin = async() => {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        appData.app.FB_APP_KEY,
        {permissions: ['public_profile', 'email', 'user_gender', 'user_location']}
    );

    if (type === 'cancel') {
        alertMessage({ title: "Cancelled", body: 'Facebook Login Failed!' });
    }

    await AsyncStorage.setItem('loksewa:auth:fbToken', token);

    return token;
};


