import React from 'react';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import VerificationScreen from "./VerificationScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";
import StackNavigator from "react-navigation/src/navigators/StackNavigator";
import PasswordResetScreen from "./PasswordResetScreen";

const AuthScreens = StackNavigator({
  LoginScreen: {screen: LoginScreen},
  RegisterScreen: {screen: RegisterScreen},
  VerificationScreen: {screen: VerificationScreen},
  ForgotPasswordScreen: {screen: ForgotPasswordScreen},
  PasswordResetScreen: {screen: PasswordResetScreen},
}, {
  headerMode: 'none'
});

export default AuthScreens;
