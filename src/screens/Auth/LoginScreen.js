import React, {Component} from 'react';
import appData from "../../constants/app";
import {KeyboardAvoidingView, StyleSheet, TouchableOpacity, UIManager, View,} from 'react-native';
import {connect} from 'react-redux';
import {AppLoading, LinearGradient} from 'expo';
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
                <View style={[styles.container]}>
                    <KeyboardAvoidingView style={{
                        flex: 1, justifyContent: 'center', alignItems: 'center',
                        marginTop: 100, marginBottom: 100
                    }}
                                            behavior="padding"
                    >   
                        <View style={styles.titleContainer}>
                            <View style={{alignItems: 'center'}}>
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                    <Image style={{width: 125, height: 125}} source={appData.app.LOGO_URL}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[styles.formContainer]}>
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
                                onChangeText={email => this.setState({email})}
                                errorMessage={errors.email ? errors.email : null}
                                autoCapitalize='none'
                            />
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
                            <Button
                                buttonStyle={globalStyles.btnPrimary}
                                containerStyle={globalStyles.btnPrimaryContainer}
                                activeOpacity={0.8}
                                title="Login"
                                onPress={this.normalLoginHandler}
                                titleStyle={globalStyles.btnPrimaryTitle}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </View>
                        <View style={styles.helpContainer}>
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
                </View>
            ) : <AppLoading/>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
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
        borderColor: 'transparent',
        backgroundColor: 'transparent',
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
    
    facebookLoginButton: {
        backgroundColor: socialColor.facebook,
        borderRadius: 25,
        height: 40,
        width:  appData.app.SCREEN_WIDTH - 65,
    },
    titleContainer: {
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
        color: Colors.black,
        fontSize: 30,
        fontWeight: 'bold'
    },
    helpContainer: {
        height: 'auto',
        alignItems: 'flex-start',
        display:'flex',
        flexDirection:'row-reverse',
        marginBottom:30,
        marginTop:20,
        width: appData.app.SCREEN_WIDTH - 65,
        justifyContent: 'space-between',
    },
    facebookContainer: {
        height: 45,
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