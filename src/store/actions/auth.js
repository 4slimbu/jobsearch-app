import {AsyncStorage} from "react-native";
import {
    AUTH_DATA_RESET,
    AUTH_SET_LOGGED_IN_STATUS,
    AUTH_SET_TOKEN,
    AUTH_SET_USER,
    AUTHENTICATE_USER,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS
} from "./actionTypes";
import {API_BASE_URL, FB_APP_KEY} from "../../constants/app";

const API_KEY = "AIzaSyC2ZkXi7n3mOinaM6F4lFGl7GV-HXmn9pU";

export const authenticateUser = (isAuthenticated) => {
    return {
        type: AUTHENTICATE_USER,
        isAuthenticated: isAuthenticated
    }
};

export const tryAuth = (authData, authMode = 'login') => {
    // email, password,
    return dispatch => {
        // dispatch(uiStartLoading());
        let url = API_BASE_URL + '/login';
        let body = {
            email: authData.email,
            password: authData.password
        };

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
        console.log(url, authData);
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .catch(err => {
                console.log('test');
                console.log(err);
                alert("Authentication failed, please try again!");
                // dispatch(uiStopLoading());
            })
            .then(res => res.json())
            .then(parsedRes => {
                // dispatch(uiStopLoading());
                console.log('response', parsedRes);
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
            })
            .catch(function () {
                console.log("error");
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
            .catch(err => {
                return AsyncStorage.getItem("loksewa:Auth:refreshToken")
                    .then(refreshToken => {
                        return fetch(
                            "https://securetoken.googleapis.com/v1/token?key=" + API_KEY,
                            {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded"
                                },
                                body: "grant_type=refresh_token&refresh_token=" + refreshToken
                            }
                        );
                    })
                    .then(res => res.json())
                    .then(parsedRes => {
                        if (parsedRes.id_token) {
                            console.log("Refresh token worked!");
                            dispatch(
                                storeAuthInfo(
                                    parsedRes.id_token,
                                    parsedRes.expires_in,
                                    parsedRes.refresh_token
                                )
                            );
                            return parsedRes.id_token;
                        } else {
                            dispatch(authClearStorage());
                        }
                    });
            })
            .then(token => {
                if (!token) {
                    throw new Error();
                } else {
                    return token;
                }
            });
    };
};

export const authAutoSignIn = (dispatch, getState) => {
    return () => {
        dispatch(authGetToken(dispatch, getState))
            .catch(err => console.log("Failed to fetch token!"));
    };
};

export const authClearStorage = () => {
    return dispatch => {
        AsyncStorage.removeItem("loksewa:auth:token");
        AsyncStorage.removeItem("loksewa:auth:expiryDate");
        return AsyncStorage.removeItem("loksewa:auth:user");
    };
};

export const authLogout = (dispatch) => {
    return () => {
        dispatch(authClearStorage()).then(() => {
            // App();
        });
        dispatch(authDataReset());
    };
};

export const authDataReset = () => {
    return {
        type: AUTH_DATA_RESET
    };
};

// How to use AsyncStorace
// AsyncStorage.setItem('loksewa:auth:fb_token')
// AsyncStorage.getItem('loksewa:auth:fb_token')
export const facebookLogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('loksewa:auth:fb_token');

    if (token) {
        console.log('loksewa:auth:fb_token:', token);
        // Dispatch an action saying FB login is done
        dispatch({
            type: FACEBOOK_LOGIN_SUCCESS,
            payload: token
        })
    } else {
        // Start up FB Login process
        return doFacebookLogin(dispatch);
    }
};

const doFacebookLogin = async dispatch => {
    const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync(
        FB_APP_KEY,
        {permissions: ['public_profile']}
    );

    if (type === 'cancel') {
        return dispatch({type: FACEBOOK_LOGIN_FAIL})
    }

    await AsyncStorage.setItem('loksewa:auth:fb_token', token);
    // dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token});
};

export const authUpdatePreferences = (preferences) => {
    return (dispatch, getState) => {
        let url = API_BASE_URL + '/me';

        const token = getState().auth.token;
        console.log('save data', {preferences: preferences});
        fetch(url, {
            method: "PUT",
            body: JSON.stringify({preferences: preferences}),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .catch(err => {
                console.log(err);
                alert("Unable to get preferences!");
                // dispatch(uiStopLoading());
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
            })
            .catch(function () {
                console.log("error");
            });
    };
};