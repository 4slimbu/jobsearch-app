import React, {Component} from 'react';
import appData from "../../constants/app";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    UIManager,
    View,
} from 'react-native';
import {LinearGradient} from 'expo';
import {Button, Image, Input} from 'react-native-elements';

import {FontAwesome} from '@expo/vector-icons';
import socialColor from "../../constants/socialColors";
import Colors from "../../constants/colors";
import {resetPassword, sendForgotPasswordEmail} from "../../store/actions/authActions";
import {connect} from "react-redux";
import {validateEmail} from "../../utils/helper/helper";
import * as _ from "lodash";
import globalStyles from "../../constants/globalStyle";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);

        // status: fresh|receivedCode|unsuccessful|successful
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            passwordResetCode: '',
            status: 'fresh',
            errors: {}
        };

        this.sendForgotPasswordEmailHandler = this.sendForgotPasswordEmailHandler.bind(this);
        this.tryAgainHandler = this.tryAgainHandler.bind(this);
        this.continueHandler = this.continueHandler.bind(this);
        this.resetPasswordHandler = this.resetPasswordHandler.bind(this);
        this.havePasswordResetCodeHandler = this.havePasswordResetCodeHandler.bind(this);
    }

    async sendForgotPasswordEmailHandler() {

        // Check for validation error
        let errors = {};
        if (!validateEmail(this.state.email)) {
            errors.email = "Email is invalid";
            this.setState({errors});
            return;
        }

        // Send Forgot Password Email
        await this.props.sendForgotPasswordEmail(this.state.email).then(res => {
        }).catch(err => {
        });

        this.setState({status: 'codeReceived'});
    }

    isResetFormValid() {
        const {password, confirmPassword, passwordResetCode} = this.state;
        let errors = {};

        if (passwordResetCode.length < 4) {
            errors.passwordResetCode = "Invalid password reset code";
        }

        if (password.length < 8) {
            errors.password = "Password must be at least 8 characters";
        }

        if (password !== confirmPassword) {
            errors.confirmPassword = "Confirm password should match password";
        }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    async resetPasswordHandler() {
        const {email, password, passwordResetCode} = this.state;

        if (!this.isResetFormValid()) {
            return;
        }

        const data = {
            email: email,
            password: password,
            token: passwordResetCode,
        };
        await this.props.resetPassword(data).then(res => {
            this.setState({status: 'successful'});
        }).catch(err => {
            this.setState({status: 'unsuccessful'});
        });

    }

    tryAgainHandler() {
        this.setState({status: 'fresh'});
    }

    havePasswordResetCodeHandler() {
        this.setState({status: 'codeReceived'});
    }

    continueHandler() {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const {
            email,
            password,
            confirmPassword,
            passwordResetCode,
            status,
            errors,
        } = this.state;

        let submitButtonTitle = 'Send Forgot Password Email';
        let submitButtonPressHandler = this.sendForgotPasswordEmailHandler;
        if (status === 'unsuccessful') {
            submitButtonTitle = 'Try Again';
            submitButtonPressHandler = this.tryAgainHandler;
        } else if (status === 'codeReceived') {
            submitButtonTitle = 'Reset Password';
            submitButtonPressHandler = this.resetPasswordHandler;
        } else if (status === 'successful') {
            submitButtonTitle = 'Continue';
            submitButtonPressHandler = this.continueHandler;
        }

        return (

            <ScrollView style={[globalStyles.scrollViewContainer]}>
                <KeyboardAvoidingView
                    style={globalStyles.keyboardAvoidingView}
                    behavior="padding"
                >
                    <View style={styles.titleContainer}>
                        <View style={{alignItems: 'center'}}>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                <Image style={{width: 100, height: 100}} source={appData.app.LOGO_URL}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {
                        status === 'processing' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size={50} color={Colors.primary}/>
                        </View>
                    }
                    {
                        status === 'codeReceived' &&
                        <View style={{alignItems: 'center'}}>
                            <View style={{paddingTop: 25}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={globalStyles.textNote}>If your email exists
                                        in our database, you will receive an email containing password reset code.
                                        Please, use it to reset your password.</Text>
                                </View>
                            </View>
                            <View style={[styles.formContainer]}>
                                <View style={globalStyles.formRow}>
                                    <Input
                                        leftIcon={
                                            <FontAwesome
                                                name="code"
                                                color={Colors.primary}
                                                size={25}
                                                style={globalStyles.inputIcon}
                                            />
                                        }
                                        value={passwordResetCode}
                                        placeholder={'Enter Password Reset Code'}
                                        containerStyle={globalStyles.inputViewContainer}
                                        inputStyle={globalStyles.inputStyle}
                                        inputContainerStyle={globalStyles.inputContainerStyle}
                                        onChangeText={passwordResetCode => this.setState({passwordResetCode})}
                                        errorMessage={errors.passwordResetCode ? errors.passwordResetCode : null}
                                    />
                                </View>
                                <View style={globalStyles.formRow}>
                                    <Input
                                        leftIcon={
                                            <FontAwesome
                                                name="lock"
                                                color={Colors.primary}
                                                size={25}
                                                style={globalStyles.inputIcon}
                                            />
                                        }
                                        value={password}
                                        secureTextEntry={true}
                                        placeholder={'Password'}
                                        containerStyle={globalStyles.inputViewContainer}
                                        inputStyle={globalStyles.inputStyle}
                                        inputContainerStyle={globalStyles.inputContainerStyle}
                                        onChangeText={password => this.setState({password})}
                                        errorMessage={errors.password ? errors.password : null}
                                    />
                                </View>
                                <View style={globalStyles.formRow}>
                                    <Input
                                        leftIcon={
                                            <FontAwesome
                                                name="lock"
                                                color={Colors.primary}
                                                size={25}
                                                style={globalStyles.inputIcon}
                                            />
                                        }
                                        value={confirmPassword}
                                        secureTextEntry={true}
                                        placeholder={'Confirm Password'}
                                        containerStyle={globalStyles.inputViewContainer}
                                        inputStyle={globalStyles.inputStyle}
                                        inputContainerStyle={globalStyles.inputContainerStyle}
                                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                                        errorMessage={errors.confirmPassword ? errors.confirmPassword : null}
                                    />
                                </View>

                            </View>
                        </View>
                    }
                    {
                        status === 'unsuccessful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <FontAwesome color={Colors.danger} name="close" size={62}/>
                                <Text>Something went wrong. Please, try again!</Text>
                            </View>
                        </View>
                    }
                    {
                        status === 'successful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <FontAwesome color={Colors.success} name="check" size={62}/>
                                <Text>Password reset successfully!</Text>
                            </View>
                        </View>
                    }
                    <View style={[styles.formContainer]}>
                    {
                        status === 'fresh' &&
                        
                        <View style={globalStyles.formRow}>
                            <Input
                                leftIcon={
                                    <FontAwesome
                                        name="envelope-o"
                                        color={Colors.primary}
                                        size={25}
                                        style={globalStyles.inputIcon}
                                    />
                                }
                                value={email}
                                placeholder={'Enter your Email'}
                                inputStyle={globalStyles.inputStyle}
                                inputContainerStyle={globalStyles.inputContainerStyle}
                                onChangeText={email => this.setState({email})}
                                errorMessage={errors.email ? errors.email : null}
                            />
                        </View>
                    }
                        <View style={globalStyles.formFlexColumn}>
                            <Button
                                buttonStyle={globalStyles.btnPrimary}
                                titleStyle={globalStyles.btnPrimaryTitle}
                                activeOpacity={0.8}
                                title={submitButtonTitle}
                                onPress={submitButtonPressHandler}
                            />

                            {
                                status === 'fresh' &&
                                <Button
                                    buttonStyle={globalStyles.btnLink}
                                    titleStyle={globalStyles.btnLinkTitle}
                                    activeOpacity={0.8}
                                    title="Have Password Reset Code?"
                                    onPress={this.havePasswordResetCodeHandler}
                                />
                            }
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    rowSelector: {
        height: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectorContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selected: {
        position: 'absolute',
        borderRadius: 50,
        height: 0,
        width: 0,
        top: -5,
        borderRightWidth: 70,
        borderBottomWidth: 70,
        borderColor: 'white',
        backgroundColor: 'transparent',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginTextButton: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    loginButton: {
        backgroundColor: '#ff4e6a',
        borderRadius: 0,
        height: 50,
        paddingLeft: 20,
        paddingRight: 20,
    },
    facebookLoginButton: {
        backgroundColor: socialColor.facebook,
        borderRadius: 10,
        height: 50,
        width: 200
    },
    titleContainer: {
        height: 150,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'transparent',
        width: appData.app.SCREEN_WIDTH - 50,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        width: '100%',
        height:'100%',
    },
    categoryText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 24,
        fontFamily: 'light',
        backgroundColor: 'transparent',
        opacity: 0.54,
    },
    selectedCategoryText: {
        opacity: 1,
    },
    titleText: {
        color: Colors.white,
        fontSize: 30,
        fontWeight: 'bold'
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        opacity: 0.90,
    },
    mainLink: {
        backgroundColor:'transparent',
        // fontSize:14,
    }
});

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        sendForgotPasswordEmail: (passwordResetCode) => dispatch(sendForgotPasswordEmail(passwordResetCode)),
        resetPassword: (data) => dispatch(resetPassword(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);