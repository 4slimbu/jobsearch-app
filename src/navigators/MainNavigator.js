import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import Drawer from "./drawer/Drawer";
import AuthNavigator from "../screens/Auth/AuthNavigator";
import React from "react";

const AppNavigator = createStackNavigator({
    Drawer: {screen: Drawer},
}, {
    headerMode: 'none'
});

const MainNavigator = createSwitchNavigator({
    App: AppNavigator,
    Auth: AuthNavigator,
}, {
    initialRouteName: 'Auth'
});

export default MainNavigator;