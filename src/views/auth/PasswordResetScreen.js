import React, {Component} from 'react';
import {
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Text,
    UIManager,
    View,
} from 'react-native';
import {Font} from 'expo';
import {Button, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import socialColor from "../../constants/socialColors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('../../../assets/images/wallpaper_2.jpg');
const LogoUrl = require('../../../assets/icons/icon.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class PasswordResetScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            fontLoaded: false,
            verificationCode: '',
            isVerificationCodeValid: false,
        };

        this.sendVerificationCode = this.sendVerificationCode.bind(this);
        this.sendVerificationCodeAgain = this.sendVerificationCodeAgain.bind(this);
    }

    async componentDidMount() {
        await Font.loadAsync({
            georgia: require('../../../assets/fonts/Georgia.ttf'),
            regular: require('../../../assets/fonts/Montserrat-Regular.ttf'),
            light: require('../../../assets/fonts/Montserrat-Light.ttf'),
        });

        this.setState({fontLoaded: true});
    }

    sendVerificationCode() {
        this.props.navigation.navigate('Components');
    }

    sendVerificationCodeAgain() {

    }

    render() {
        const {
            isLoading,
            isVerificationCodeValid,
            verificationCode
        } = this.state;
        return (

            <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                <ScrollView style={[styles.container]} horizontal={false}>
                    {this.state.fontLoaded ? (
                        <View>
                            <KeyboardAvoidingView
                                contentContainerStyle={styles.loginContainer}
                                behavior="position"
                            >
                                <View style={styles.titleContainer}>
                                    <View style={{alignItems: 'center'}}>
                                        <Image style={{width: 100, height: 100}} source={LogoUrl}/>
                                        <Text style={styles.titleText}>LokSewa</Text>
                                    </View>
                                </View>
                                <View style={[styles.formContainer, {marginTop: 50}]}>
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="envelope-o"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={verificationCode}
                                        keyboardAppearance="light"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        returnKeyType="next"
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Password'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        }}
                                        onChangeText={verificationCode => this.setState({verificationCode})}
                                        errorMessage={
                                            isVerificationCodeValid ? null : 'Please enter a valid Password'
                                        }
                                    />
                                    <Input
                                        leftIcon={
                                            <Icon
                                                name="envelope-o"
                                                color="rgba(0, 0, 0, 0.38)"
                                                size={25}
                                                style={{backgroundColor: 'transparent'}}
                                            />
                                        }
                                        value={verificationCode}
                                        keyboardAppearance="light"
                                        autoFocus={false}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                        returnKeyType="next"
                                        inputStyle={{marginLeft: 10}}
                                        placeholder={'Re-password'}
                                        containerStyle={{
                                            borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                        }}
                                        onChangeText={verificationCode => this.setState({verificationCode})}
                                        errorMessage={
                                            isVerificationCodeValid ? null : 'Please enter a valid Password'
                                        }
                                    />
                                </View>
                                <View>
                                    <Button
                                        buttonStyle={styles.loginButton}
                                        containerStyle={{marginTop: 32, flex: 0}}
                                        activeOpacity={0.8}
                                        title="Reset Password"
                                        onPress={() => this.props.navigation.navigate('App')}
                                        titleStyle={styles.loginTextButton}
                                        loading={isLoading}
                                        disabled={isLoading}
                                    />
                                </View>
                            </KeyboardAvoidingView>

                        </View>
                    ) : (
                        <Text>Loading...</Text>
                    )}
                </ScrollView>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50
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
        color: 'white',
        fontSize: 30,
        fontFamily: 'regular',
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
