import React from 'react';
import {AppLoading, Asset, Font} from 'expo';
import {FontAwesome, Ionicons} from '@expo/vector-icons';
import {Image} from 'react-native';
import Login from "./views/login/Login";
import {SwitchNavigator} from "react-navigation";
import Drawer from "./drawer/drawer";
import {connect} from "react-redux";

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

class MainContainer extends React.Component {
    state = {
      isReady: false,
    };
  
    async _loadAssetsAsync() {
      const imageAssets = cacheImages([
        require('../assets/images/bg_screen1.jpg'),
        require('../assets/images/bg_screen2.jpg'),
        require('../assets/images/bg_screen3.jpg'),
        require('../assets/images/bg_screen4.jpg'),
        require('../assets/images/user-cool.png'),
        require('../assets/images/user-hp.png'),
        require('../assets/images/user-student.png'),
        require('../assets/images/avatar1.jpg'),
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
  
      const MainNavigation = SwitchNavigator({
        App: Drawer,
        Auth: Login,
      }, {
        initialRouteName: this.props && this.props.auth && this.props.auth.isAuthenticated ? 'App' : 'Auth' 
      });

      return (
        <MainNavigation/>
      );
    }
  }

  const mapStateToProps = state => {
    return {
      auth: state.main.auth
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      onAuthenticateUser: (isAuthenticated) => dispatch(authenticateUser(isAuthenticated))
    };
  }

  export default connect(mapStateToProps, mapDispatchToProps) (MainContainer);