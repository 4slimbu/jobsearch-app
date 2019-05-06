import {AsyncStorage} from "react-native";
import {
    AUTH_DATA_RESET,
    AUTH_SET_LOGGED_IN_STATUS,
    AUTH_SET_TOKEN,
    AUTH_SET_USER,
    AUTHENTICATE_USER
} from "./actionTypes";
import {API_BASE_URL, FB_APP_KEY} from "../../constants/app";
import {getMyPosts} from "./postActions";

const API_KEY = "AIzaSyC2ZkXi7n3mOinaM6F4lFGl7GV-HXmn9pU";

export const authenticateUser = (isAuthenticated) => {
    return {
        type: AUTHENTICATE_USER,
        isAuthenticated: isAuthenticated
    }
};

export const tryAuth = (authData, authMode = 'login') => {
    // dispatch(uiStartLoading());
    let url = API_BASE_URL + '/login';
    let body = {};
    if (authMode === "login") {
        body = {
            email: authData.email,
            password: authData.password
        };
    }

    if (authMode === "register") {
        url = API_BASE_URL + '/register';
        body = {
            email: authData.email,
            password: authData.password,
            first_name: authData.firstName,
            last_name: authData.lastName,
            gender: authData.gender,
            contact_number: authData.contactNumber
        }
    }

    if (authMode === "fbLogin") {
        url = API_BASE_URL + '/login';
        body = {
            fb_token: authData.fbToken
        }
    }

    // email, password,
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
                .catch(err => {
                    console.log(err);
                    alert("Authentication failed, please try again!");
                    // dispatch(uiStopLoading());
                })
                .then(res => res.json())
                .then(parsedRes => {
                    // dispatch(uiStopLoading());
                    if (!parsedRes.access_token) {
                        if (parsedRes.error === 'UserExistsException' && parsedRes.message) {
                            alert(parsedRes.message);
                        } else {
                            alert("Authentication failed, please try again!");
                        }
                    } else {
                        dispatch(
                            storeAuthInfo(parsedRes)
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
            console.log('inside authLogout');
            dispatch(authClearStorage());
            dispatch(authDataReset());

            resolve(1);
        }).catch(err => {
            console.log('inside catch authLogout');
            reject();
        });
    };
};

export const authDataReset = () => {
    return {
        type: AUTH_DATA_RESET
    };
};

// How Facebook Login works
// User click on facebook login button
// If AsyncStorage has fbToken
    // Then login request is sent to the loksewa server with the token
        // The token is decoded there and checked for validity
            // If valid, user information is stored and login is performed by normal method and returned new jwt token
                // That response is processed and stored in redux store and the app is now authenticated
            // If not valid, error response is sent from the server. In this case, facebook login is called which will
            // return fbToken which is then saved to AsyncStorage and call to login is again made using fbToken
// If no fbToken in AsyncStorage then facebook login is called directly

// How to use AsyncStorage
// AsyncStorage.setItem('loksewa:auth:fbToken')
// AsyncStorage.getItem('loksewa:auth:fbToken')
export const facebookLogin = () => async dispatch => {
    let fbToken = await AsyncStorage.getItem('loksewa:auth:fbToken');

    if (! fbToken) {
        fbToken = await doFacebookLogin(dispatch);
    }

    dispatch(tryAuth({fbToken: fbToken}, 'fbLogin'));
};

const doFacebookLogin = async() => {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        FB_APP_KEY,
        {permissions: ['public_profile', 'email', 'user_gender', 'user_location']}
    );

    if (type === 'cancel') {
        alert('Facebook Login Failed!');
    }

    await AsyncStorage.setItem('loksewa:auth:fbToken', token);

    return token;
};

export const authUpdatePreferences = (preferences) => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/me';

        const token = getState().auth.token;
        return new Promise((resolve, reject) => {
            fetch(url, {
                method: "PUT",
                body: JSON.stringify({preferences: preferences}),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
                .then(res => res.json())
                .then(parsedRes => {
                    console.log('preferences', parsedRes);
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
                    console.log("error");
                });
        })
    };
};

export const verifyEmail = (verificationCode) => {
    let url = API_BASE_URL + '/verify-email/' + verificationCode;
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
                    console.log(err);
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
                    console.log("error");
                });
        });
    };
};

export const sendForgotPasswordEmail = (email) => {
    let url = API_BASE_URL + '/forgot-password';
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
                    console.log(parsedRes);
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                    console.log("error 2");
                });
        });
    };
};

export const resetPassword = (data) => {
    let url = API_BASE_URL + '/reset-password';
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
                .then(() => {
                    resolve();
                })
                .catch(function () {
                    reject();
                    console.log("error");
                });
        });
    };
};

export const reSendVerificationCode = () => {
    let url = API_BASE_URL + '/resend-verification-code';
    return (dispatch, getState) => {
        const token = getState().auth.token;
        console.log('reSendVerificationCode', url, token);
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
                    console.log(parsedRes);
                    resolve(parsedRes);
                })
                .catch(function () {
                    reject();
                    console.log("error");
                });
        });
    };
};

export const updateMyProfile = (formData) => {
    let url = API_BASE_URL + '/me';
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
                    console.log('update profile response', parsedRes);
                    if (!parsedRes.data) {
                        console.log('Get Post Error', err);
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
                    console.log("error");
                });
        });
    };
};

export const updatePassword = (formData) => {
    let url = API_BASE_URL + '/me/reset-password';
    return (dispatch, getState) => {
        const token = getState().auth.token;
        console.log(formData);
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
                    console.log('update password response', parsedRes);
                    resolve(parsedRes);
                })
                .catch(function() {
                    reject();
                    console.log("error");
                });
        });
    };
};

