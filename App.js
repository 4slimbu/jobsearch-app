import React from 'react';
import {registerRootComponent, Permissions, Notifications} from 'expo';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import {AsyncStorage, StyleSheet} from "react-native";
import {createAppContainer} from "react-navigation";
import MainNavigator from "./src/navigators/MainNavigator";

const store = configureStore();

const registerForPushNotificationsAsync = async() => {
    let deviceId = await AsyncStorage.getItem('loksewa:auth:deviceId');

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

    AsyncStorage.setItem("loksewa:auth:deviceId", deviceId);
    console.log('expo push token:' + deviceId);
};

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    state = {
        notification: {},
    };

    componentDidMount() {
        registerForPushNotificationsAsync();

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
                <AppContainer />
                {/*<View style={[styles.container, styles.horizontal]}>*/}
                {/*  <ActivityIndicator size="large" color="red" />*/}
                {/*</View>*/}
            </Provider>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    }
});

registerRootComponent(App);
