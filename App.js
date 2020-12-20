import React, {Component} from 'react';
import {Notifications, registerRootComponent} from 'expo';
import * as Permissions from "expo-permissions";
import {Provider} from 'react-redux';
import store from './src/store/configureStore';
import {AsyncStorage} from "react-native";
import NavigationService from "./src/services/NavigationService";
import Constants from 'expo-constants';
import {createAppContainer} from "react-navigation";
import MainNavigator from "./src/navigators/MainNavigator";
import AppLoading from "./src/components/AppLoading";

const registerForPushNotificationsAsync = async () => {
    // don't proceed if simulator
    if (! Constants.isDevice) {
        return;
    }

    let deviceId = await AsyncStorage.getItem('jobsearch:auth:deviceId');

    if (deviceId) {
        return;
    }

    const {status: existingStatus} = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    deviceId = await Notifications.getExpoPushTokenAsync();

    AsyncStorage.setItem("jobsearch:auth:deviceId", deviceId);
};

const AppContainer = createAppContainer(MainNavigator);

export default class App extends Component {
    state = {
        notification: {},
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        registerForPushNotificationsAsync().then((res) => {
        }).catch((err) => {});

        // Handle notifications that are received or selected while the app
        // is open. If the app was closed and then opened by tapping the
        // notification (rather than just tapping the app icon to open it),
        // this function will fire on the next tick after the app starts
        // with the notification data.
        this._notificationSubscription = Notifications.addListener(this._handleNotification);
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
        if (notification && notification.data && notification.data.postId) {
            const postId = notification.data.postId;
            this.props.navigation.navigate('PostDetail', {postId: postId});
        }
    };

    render() {
        return (
            <Provider store={store}>
                <AppContainer ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef);
                    }}
                />
                <AppLoading/>
            </Provider>
        )
    }
}

registerRootComponent(App);
