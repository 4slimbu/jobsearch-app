import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, UIManager, View,} from 'react-native';
import {connect} from 'react-redux';
import {AppLoading} from 'expo';
import {Button, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import socialColor from "../../constants/socialColors";
import {authAutoSignIn, facebookLogin, tryAuth} from '../../store/actions/authActions';
import {APP_NAME} from "../../constants/app";
import Colors from "../../constants/colors";
import * as _ from "lodash";
import {validateEmail} from "../../utils/helper/helper";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');


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
            email: "",
            password: "",
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

            if ( ! this.props.auth.user.verified) {
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

        if (! validateEmail(email)) {
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

        if (! this.isFormValid()) {
            return;
        }

        this.setState({isLoading: true});

        await this.props.onTryAuth({email: email, password: password}).then(() => {
            if ( this.props.auth.isLoggedIn && !this.props.auth.user.verified) {
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
            console.log(err);
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
            <ScrollView style={[styles.container]}>

                    <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center', alignItems: 'center',
                        marginTop: 100, marginBottom: 100}}
                                          behavior="padding"
                    >
                        <View style={styles.titleContainer}>
                            <View style={{alignItems: 'center'}}>
                                <Image style={{width: 100, height: 100}} source={LogoUrl}/>
                                <Text style={styles.titleText}>{APP_NAME}</Text>
                            </View>
                        </View>
                        <View style={[styles.formContainer]}>
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
                                keyboardType="email-address"
                                inputStyle={{marginLeft: 10}}
                                placeholder={'Email'}
                                containerStyle={{
                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                }}
                                onChangeText={email => this.setState({email})}
                                errorMessage={errors.email ? errors.email : null}
                            />
                            <Input
                                leftIcon={
                                    <SimpleIcon
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
                                errorMessage={errors.password ? errors.password : null}
                            />
                            <Button
                                buttonStyle={styles.loginButton}
                                containerStyle={{marginTop: 32, flex: 0}}
                                activeOpacity={0.8}
                                title="LOGIN"
                                onPress={this.normalLoginHandler}
                                titleStyle={styles.loginTextButton}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </View>
                        <View style={styles.helpContainer}>
                            <Button
                                title={'Forgot Password?'}
                                titleStyle={{color: Colors.grey1}}
                                buttonStyle={{backgroundColor: 'transparent'}}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                            />
                            <Button
                                title={'Register'}
                                titleStyle={{color: Colors.grey1}}
                                buttonStyle={{backgroundColor: 'transparent', marginBottom: 25}}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('RegisterScreen')}
                            />
                        </View>
                        <View style={styles.facebookContainer}>
                            <Button
                                title={'Login with Facebook'}
                                titleStyle={{color: 'white'}}
                                buttonStyle={styles.facebookLoginButton}
                                underlayColor="transparent"
                                onPress={this.facebookLoginHandler}
                            />
                        </View>
                    </KeyboardAvoidingView>

            </ScrollView>
            ) : <AppLoading/>
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
        flex: 1,
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
        width: 200,
    },
    facebookLoginButton: {
        backgroundColor: socialColor.facebook,
        borderRadius: 10,
        height: 50,
        width: 200
    },
    titleContainer: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
    },
    formContainer: {
        backgroundColor: 'white',
        width: SCREEN_WIDTH - 50,
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
        fontWeight: 'bold'
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
    facebookContainer: {
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
        authAutoSignIn: () => dispatch(authAutoSignIn()),
        onTryAuth: (authData) => dispatch(tryAuth(authData)),
        onFacebookLogin: () => dispatch(facebookLogin())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);