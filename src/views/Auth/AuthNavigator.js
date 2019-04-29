import React from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerificationScreen from "./VerificationScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import {createStackNavigator} from "react-navigation";
import PasswordResetScreen from "./PasswordResetScreen";

const AuthNavigator = createStackNavigator({
  LoginScreen: {screen: LoginScreen},
  RegisterScreen: {screen: RegisterScreen},
  VerificationScreen: {screen: VerificationScreen},
  ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  PasswordResetScreen: {screen: PasswordResetScreen},
}, {
  headerMode: 'none'
});

export default AuthNavigator;
