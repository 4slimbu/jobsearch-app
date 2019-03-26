import React from 'react';
import {AppLoading, Asset, Font, registerRootComponent} from 'expo';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Image} from 'react-native';
import Login from "./src/views/login/Login";
import {SwitchNavigator} from "react-navigation";
import Drawer from "./src/drawer/drawer";

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const MainNavigation = SwitchNavigator({
    App: Drawer,
    Auth: Login,
}, {
  initialRouteName: 'Auth'
});

export default class AppContainer extends React.Component {
  state = {
    isReady: false,
  };

  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/images/bg_screen1.jpg'),
      require('./assets/images/bg_screen2.jpg'),
      require('./assets/images/bg_screen3.jpg'),
      require('./assets/images/bg_screen4.jpg'),
      require('./assets/images/user-cool.png'),
      require('./assets/images/user-hp.png'),
      require('./assets/images/user-student.png'),
      require('./assets/images/avatar1.jpg'),
    ]);

    const fontAssets = cacheFonts([FontAwesome.font, Ionicons.font]);

    await Promise.all([...imageAssets, ...fontAssets]);
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._loadAssetsAsync}
          onFinish={() => this.setState({ isReady: true })}
        />
      );
    }

    return <MainNavigation />;
  }
}

registerRootComponent(AppContainer);
