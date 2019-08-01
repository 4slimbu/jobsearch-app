import React, {Component} from 'react';
import appData from "../../constants/app";
import {Platform, KeyboardAvoidingView, StyleSheet, TouchableOpacity, UIManager, View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {AppLoading, LinearGradient, Constants} from 'expo';
import {Button, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import socialColor from "../../constants/socialColors";
import {authAutoSignIn, facebookLogin, tryAuth} from '../../store/actions/authActions';

import Colors from "../../constants/colors";
import * as _ from "lodash";
import {validateEmail} from "../../utils/helper/helper";
import globalStyles from "../../constants/globalStyle";


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            isPasswordValid: true,
            isEmailValid: true,
            email: '',
            password: '',
            isReady: false,
            isLoading: false,
            isLoggedIn: false,
            errors: {}
        };

        this.normalLoginHandler = this.normalLoginHandler.bind(this);
        this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.authAutoSignIn().then(res => {
            this.setState({isLoggedIn: true});

            if (!this.props.auth.user.verified) {
                this.props.navigation.navigate('VerificationScreen');
            } else {
                this.props.navigation.navigate('App');
            }
        }).catch(err => {
        });

        this._isMounted && this.setState({isReady: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isFormValid() {
        const {email, password} = this.state;
        let errors = {};

        if (!validateEmail(email)) {
            errors.email = "Email is invalid";
        }

        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    async normalLoginHandler() {
        const {email, password} = this.state;

        if (!this.isFormValid()) {
            return;
        }

        this.setState({isLoading: true});

        await this.props.onTryAuth({email: email, password: password}).then(() => {
            if (this.props.auth.isLoggedIn && !this.props.auth.user.verified) {
                this.props.navigation.navigate('VerificationScreen');
            } else if (this.props.auth.isLoggedIn && this.props.auth.user.verified) {
                this.props.navigation.navigate('App');
            }
        }).catch(err => {
        });

        this._isMounted && this.setState({isReady: true});
        this._isMounted && this.setState({isLoading: false});
    }

    facebookLoginHandler() {
        this.props.onFacebookLogin()
            .then((res) => {
                this.props.navigation.navigate('App');
            }).catch(err => {
        });
    }

    render() {
        const {
            isReady,
            isLoading,
            email,
            password,
            errors
        } = this.state;
        return (
            isReady ? (
                <ScrollView style={globalStyles.scrollViewContainer}>
                    <View style={globalStyles.scrollViewContentView}>
                        <KeyboardAvoidingView
                            style={styles.loginFormContainer}
                            behavior="padding">   
                            <View style={styles.titleContainer}>
                                <View style={{alignItems: 'center'}}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                        <Image style={{width: 125, height: 125}} source={appData.app.LOGO_URL}/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={[styles.formContainer]}>
                                <View style={globalStyles.formRow}>
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="envelope-o"
                                                color={Colors.primary}
                                                size={25}
                                                style={globalStyles.inputIcon}
                                            />
                                        }
                                        value={email}
                                        keyboardType="email-address"
                                        placeholder={'Email'}
                                        inputStyle={globalStyles.inputStyle}
                                        inputContainerStyle={globalStyles.inputContainerStyle}
                                        containerStyle={globalStyles.inputOuterContainerStyle}
                                        onChangeText={email => this.setState({email})}
                                        errorMessage={errors.email ? errors.email : null}
                                        autoCapitalize='none'
                                    />
                                </View>
                                <View style={globalStyles.formRow}>
                                    <Input
                                        leftIcon={
                                            <SimpleIcon
                                                name="lock"
                                                color={Colors.primary}
                                                size={25}
                                                style={globalStyles.inputIcon}
                                            />
                                        }
                                        value={password}
                                        secureTextEntry={true}
                                        containerStyle={globalStyles.inputViewContainer}
                                        inputContainerStyle={globalStyles.inputContainerStyle}
                                        inputStyle={globalStyles.inputStyle}
                                        placeholder={'Password'}
                                        onChangeText={password => this.setState({password})}
                                        errorMessage={errors.password ? errors.password : null}
                                    />
                                </View>

                                <View style={[globalStyles.formFlexRow, globalStyles.formRowMarginBottom]}>
                                    <Button
                                        buttonStyle={globalStyles.btnPrimary}
                                        containerStyle={globalStyles.btnPrimaryContainer}
                                        titleStyle={globalStyles.btnPrimaryTitle}
                                        activeOpacity={0.8}
                                        title="Login"
                                        onPress={this.normalLoginHandler}                                
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>
                                <View style={[globalStyles.formFlexRow, { justifyContent: "space-between", marginBottom: 50,}]}>
                                    <Button
                                        title={'Forgot Password?'}
                                        titleStyle={globalStyles.btnLinkTitle}
                                        buttonStyle={[globalStyles.btnLink]}
                                        underlayColor="transparent"
                                        onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                                    />
                                    <Button
                                        title={'Register'}
                                        titleStyle={globalStyles.btnLinkTitle}
                                        buttonStyle={[globalStyles.btnLink, globalStyles.btnLinkRight]}
                                        underlayColor="transparent"
                                        onPress={() => this.props.navigation.navigate('RegisterScreen')}
                                    />
                                </View>
                                <View style={[globalStyles.formFlexColumn]}>
                                    <Button
                                        title={'Login with Facebook'}
                                        titleStyle={{color: 'white'}}
                                        buttonStyle={styles.facebookLoginButton}
                                        underlayColor="transparent"
                                        onPress={this.facebookLoginHandler}
                                    />
                                </View>
                            </View>
                            
                        </KeyboardAvoidingView>
                    </View>
                </ScrollView>
            ) : <AppLoading/>
        );
    }
}

const styles = StyleSheet.create({

    loginFormContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100,
    },

    facebookLoginButton: {
        backgroundColor: socialColor.facebook,
        borderRadius: 25,
        height: 40,
        width: '100%',
        flex: 1,
        flexWrap: "wrap",
    },

    titleContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },

    formContainer: {
        backgroundColor: 'transparent',
        width: appData.app.SCREEN_WIDTH - 65,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingLeft: 0,
    },
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        authAutoSignIn: () => dispatch(authAutoSignIn()),
        onTryAuth: (authData) => dispatch(tryAuth(authData)),
        onFacebookLogin: () => dispatch(facebookLogin())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);