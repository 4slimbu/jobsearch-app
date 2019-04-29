import React from 'react';
import {AppLoading, Asset, Font} from 'expo';
import {Image} from 'react-native';
import {createAppContainer, createSwitchNavigator} from "react-navigation";
import {connect} from "react-redux";
import AuthNavigator from "./views/Auth/AuthNavigator";
import {authAutoSignIn} from "./store/actions";
import Drawer from "./drawer/drawer";

// TODO: organize navigations as below
/*
Navigation:
- AppLoading
- App
    - Categories
        - Categories Detail
        - Post Detail
    - Manage Posts
        - Post Detail
        - Post Edit
        - Post Add
        - Post Delete
        - My comments
        - My Posts
        - My Saved Posts
        - My Profile
    - Search
        - Search Detail
- Drawer
 */

const MainNavigation = createSwitchNavigator({
    App: Drawer,
    Auth: AuthNavigator,
}, {
    initialRouteName: 'Auth'
});

const AppContainer = createAppContainer(MainNavigation);

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
    constructor(props) {
        super(props);
        this._isMounted = false;

        this.state = {
            isReady: true,
        }
    };

    async componentDidMount() {
        this.props.authAutoSignIn();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        if (!this.state.isReady) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isReady: true})}
                />
            );
        }

        return (
            <AppContainer/>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authAutoSignIn: dispatch(authAutoSignIn)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);