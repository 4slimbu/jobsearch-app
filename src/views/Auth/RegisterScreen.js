import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, UIManager, View,} from 'react-native';
import {connect} from 'react-redux';
import {Font} from 'expo';
import {Button, ButtonGroup, CheckBox, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import socialColor from "../../constants/socialColors";
import {facebookLogin, tryAuth} from '../../store/actions';
import {APP_NAME} from "../../constants/app";
import Colors from "../../constants/colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            isLoading: false,
            fontLoaded: false,
            isEmailValid: true,
            isPasswordValid: true,
            isConfirmationValid: true,
            isFirstNameValid: true,
            isLastNameValid: true,
            isContactValid: true,
            email: "responsivesudip@gmail.com",
            password: "password",
            passwordConfirmation: "password",
            firstName: "furst",
            lastName: "sdfsd",
            gender: "male",
            contactNumber: "29382398238923"
        };

        this.registerHandler = this.registerHandler.bind(this);
        this.facebookLoginHandler = this.facebookLoginHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && await Font.loadAsync({
            georgia: require('../../../assets/fonts/Georgia.ttf'),
            regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../../assets/fonts/Montserrat-Light.ttf'),
        });
        this._isMounted && this.setState({fontLoaded: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    registerHandler() {
        const {email, password, firstName, lastName, gender, contactNumber} = this.state;
        // this.setState({isLoading: true});
        this.props.onTryAuth({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            contactNumber: contactNumber
        }, 'register');
    }

    facebookLoginHandler() {
        this.props.onFacebookLogin();
    }

    render() {
        const {
            isLoading,
            fontLoaded,
            isEmailValid,
            isPasswordValid,
            isConfirmationValid,
            isFirstNameValid,
            isLastNameValid,
            isContactValid,
            email,
            password,
            passwordConfirmation,
            firstName,
            lastName,
            gender,
            contactNumber
        } = this.state;
        return (
            <ScrollView style={[styles.container]}>
                {fontLoaded ? (
                    <KeyboardAvoidingView style={{flex: 1, justifyContent: 'center',
                        alignItems: 'center', marginTop: 100, marginBottom: 100}}
                        behavior="padding"
                    >
                            <View style={styles.titleContainer}>
                                <View style={{alignItems: 'center'}}>
                                    <Image style={{width: 100, height: 100}} source={LogoUrl}/>
                                    <Text style={styles.titleText}>{APP_NAME}</Text>
                                </View>
                            </View>
                            <View style={styles.formContainer}>
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
                                    keyboardType="email-address"
                                    returnKeyType="next"
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Email'}
                                    containerStyle={{
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    onSubmitEditing={() => this.passwordInput.focus()}
                                    onChangeText={email => this.setState({email})}
                                    errorMessage={
                                        isEmailValid ? null : 'Please enter a valid email address'
                                    }
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
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={true}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Password'}
                                    ref={input => (this.passwordInput = input)}
                                    onSubmitEditing={this.login}
                                    onChangeText={password => this.setState({password})}
                                    errorMessage={
                                        isPasswordValid
                                            ? null
                                            : 'Please enter at least 8 characters'
                                    }
                                />

                                <Input
                                    icon={
                                        <SimpleIcon
                                            name="lock"
                                            color="rgba(0, 0, 0, 0.38)"
                                            size={25}
                                            style={{backgroundColor: 'transparent'}}
                                        />
                                    }
                                    value={passwordConfirmation}
                                    secureTextEntry={true}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType={'done'}
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Confirm password'}
                                    onSubmitEditing={this.signUp}
                                    onChangeText={passwordConfirmation =>
                                        this.setState({passwordConfirmation})
                                    }
                                    errorMessage={
                                        isConfirmationValid
                                            ? null
                                            : 'Please enter the same password'
                                    }
                                />


                                <Input
                                    value={firstName}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType={'done'}
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'First Name'}
                                    onChangeText={firstName =>
                                        this.setState({firstName})
                                    }
                                    errorMessage={
                                        isFirstNameValid
                                            ? null
                                            : 'First Name is required'
                                    }
                                />


                                <Input
                                    value={lastName}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType={'done'}
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Last Name'}
                                    onChangeText={lastName =>
                                        this.setState({lastName})
                                    }
                                    errorMessage={
                                        isLastNameValid
                                            ? null
                                            : 'Last name is required'
                                    }
                                />

                                <CheckBox
                                    center
                                    title='Male'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={gender === 'male'}
                                    onPress={() => this.setState({gender: "male"})}

                                />

                                <CheckBox
                                    center
                                    title='Female'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={gender === 'female'}
                                    onPress={() => this.setState({gender: "female"})}
                                />


                                <Input
                                    value={contactNumber}
                                    keyboardAppearance="light"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType="default"
                                    returnKeyType={'done'}
                                    blurOnSubmit={true}
                                    containerStyle={{
                                        marginTop: 16,
                                        borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                    }}
                                    inputStyle={{marginLeft: 10}}
                                    placeholder={'Mobile No.'}
                                    onChangeText={contactNumber =>
                                        this.setState({contactNumber})
                                    }
                                    errorMessage={
                                        isContactValid
                                            ? null
                                            : 'Contact no is invalid'
                                    }
                                />

                                <Button
                                    buttonStyle={styles.loginButton}
                                    containerStyle={{marginTop: 32, flex: 0}}
                                    activeOpacity={0.8}
                                    title="LOGIN"
                                    onPress={this.registerHandler}
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
                                title={'Login'}
                                titleStyle={{color: Colors.grey1}}
                                buttonStyle={{backgroundColor: 'transparent'}}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('LoginScreen')}
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
                ) : (
                    <Text>Loading...</Text>
                )}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
        fontFamily: 'regular',
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
        onTryAuth: (authData, authMode) => dispatch(tryAuth(authData, authMode)),
        onFacebookLogin: dispatch(facebookLogin)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);