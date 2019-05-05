import React, {Component} from 'react';
import {
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import socialColor from "../../constants/socialColors";
import Colors from "../../constants/colors";
import {resetPassword, sendForgotPasswordEmail} from "../../store/actions/authActions";
import {connect} from "react-redux";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);

        // status: fresh|processing|receivedCode|unsuccessful|successful
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            confirmPassword: '',
            passwordResetCode: '',
            status: 'fresh',
            isPasswordValid: true,
            isPasswordResetCodeValid: true,
            isConfirmPasswordValid: true
        };

        this.sendForgotPasswordEmailHandler = this.sendForgotPasswordEmailHandler.bind(this);
        this.tryAgainHandler = this.tryAgainHandler.bind(this);
        this.continueHandler = this.continueHandler.bind(this);
        this.resetPasswordHandler = this.resetPasswordHandler.bind(this);
    }

    async sendForgotPasswordEmailHandler() {
        this.setState({status: 'processing'});

        await this.props.sendForgotPasswordEmail(this.state.email).then(res => {
            this.setState({
                status: 'codeReceived'
            })
        }).catch(err => {
            this.setState({
                status: 'codeReceived'
            })
        });
    }

    async resetPasswordHandler() {
        const {email, password, passwordResetCode} = this.state;
        const data = {
            email: email,
            password: password,
            token: passwordResetCode,
        };
        await this.props.resetPassword(data).then(res => {
            this.setState({
                status: 'successful'
            })
        }).catch(err => {
            console.log('onrejected', err);
            this.setState({
                status: 'unsuccessful'
            })
        });
    }

    tryAgainHandler() {
        this.setState({status: 'fresh'});
    }

    continueHandler() {
        this.props.navigation.navigate('LoginScreen');
    }

    render() {
        const {
            isLoading,
            email,
            password,
            confirmPassword,
            passwordResetCode,
            status,
            isPasswordResetCodeValid,
            isPasswordValid,
            isConfirmPasswordValid,
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

            <ScrollView style={[styles.container]}>
                <KeyboardAvoidingView style={{
                    flex: 1, justifyContent: 'center',
                    alignItems: 'center', marginTop: 100, marginBottom: 100
                }}
                                      behavior="padding"
                >
                    <View style={styles.titleContainer}>
                        <View style={{alignItems: 'center'}}>
                            <Image style={{width: 100, height: 100}} source={LogoUrl}/>
                            <Text style={styles.titleText}>LokSewa</Text>
                        </View>
                    </View>
                    {
                        status === 'processing' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size={50} color={Colors.primary1}/>
                        </View>
                    }
                    {
                        status === 'codeReceived' &&
                        <View style={{alignItems: 'center'}}>
                            <View style={{paddingTop: 25}}>
                                <View style={{alignItems: 'center'}}>
                                    <Text style={{paddingLeft: 30, paddingRight: 30, fontSize: 18}}>If your email exists in our database, you will receive an email containing password reset code.
                                        Please, use it to reset your password.</Text>
                                </View>
                            </View>
                            <View style={[styles.formContainer]}>
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="code"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    }
                                    value={passwordResetCode}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Enter Password Reset Code'}
                                    onChangeText={passwordResetCode => this.setState({passwordResetCode})}
                                    errorMessage={
                                        isPasswordResetCodeValid
                                            ? null
                                            : 'Please enter Password Reset Code'
                                    }
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="lock"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    }
                                    value={password}
                                    secureTextEntry={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Password'}
                                    onChangeText={password => this.setState({password})}
                                    errorMessage={
                                        isPasswordValid
                                            ? null
                                            : 'Please enter at least 8 characters'
                                    }
                                />
                                <Input
                                    leftIcon={
                                        <Icon
                                            name="lock"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    }
                                    value={confirmPassword}
                                    secureTextEntry={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Confirm Password'}
                                    onChangeText={confirmPassword => this.setState({confirmPassword})}
                                    errorMessage={
                                        isConfirmPasswordValid
                                            ? null
                                            : 'Confirm Password must match password'
                                    }
                                />

                            </View>
                        </View>
                    }
                    {
                        status === 'unsuccessful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Icon color='green' name="check" size={62}/>
                                <Text>Something went wrong. Please, try again!</Text>
                            </View>
                        </View>
                    }
                    {
                        status === 'successful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Icon color='red' name="close" size={62}/>
                                <Text>Password reset successfully!</Text>
                            </View>
                        </View>
                    }
                    {
                        status === 'fresh' &&
                        <View style={[styles.formContainer, {height: 150}]}>
                            <Input
                                leftIcon={
                                    <Icon
                                        name="envelope-o"
                                        color="rgba(0, 0, 0, 0.38)"
                                        size={25}
                                        style={{backgroundColor: 'transparent'}}
                                    />
                                }
                                value={email}
                                keyboardAppearance="light"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                inputStyle={{marginLeft: 10}}
                                placeholder={'Enter your Email'}
                                containerStyle={{
                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                }}
                                onChangeText={email => this.setState({email})}
                            />
                        </View>

                    }
                    <View>
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title={submitButtonTitle}
                            onPress={submitButtonPressHandler}
                            titleStyle={styles.loginTextButton}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
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
        backgroundColor: 'white',
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
        backgroundColor: 'rgba(232, 147, 142, 1)',
        borderRadius: 10,
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
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
    },
    loginText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
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
        color: Colors.grey1,
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
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