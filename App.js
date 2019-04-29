import React from 'react';
import {registerRootComponent, Permissions, Notifications} from 'expo';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import MainContainer from './src/MainContainer';
import {StyleSheet} from "react-native";

const store = configureStore();

async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();
  
  console.log('expo push token', token);
  // POST the token to your backend server from where you can retrieve it to send push notifications.
  // return fetch(PUSH_ENDPOINT, {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     token: {
  //       value: token,
  //     },
  //     user: {
  //       username: 'Brent',
  //     },
  //   }),
  // });
}

registerForPushNotificationsAsync();

export default class App extends React.Component {
  render() {
    return(
      <Provider store={store}>
        <MainContainer/>
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
