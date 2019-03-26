import React from 'react';
import { StackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import Login from '../views/login/Login';
import VerificationScreen from "../views/login/VerificationScreen";
import ForgotPasswordScreen from "../views/login/ForgotPasswordScreen";

const LoginDrawerItem = StackNavigator(
  {
    Login: { screen: Login },
    VerificationScreen: { screen: VerificationScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  },
  {
    headerMode: 'none',
  }
);

LoginDrawerItem.navigationOptions = {
  drawerLabel: 'Login',
  drawerIcon: ({ tintColor }) => (
    <Icon
      name="email"
      size={30}
      iconStyle={{
        width: 30,
        height: 30,
      }}
      type="material"
      color={tintColor}
    />
  ),
};

export default LoginDrawerItem;
