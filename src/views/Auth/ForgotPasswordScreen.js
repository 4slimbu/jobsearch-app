import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView, StyleSheet, Text, UIManager, View,} from 'react-native';
import {Button, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import socialColor from "../../constants/socialColors";
import Colors from "../../constants/colors";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

export default class ForgotPasswordScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            fontLoaded: false,
            verificationCode: '',
            isVerificationCodeValid: false,
        };

        this.sendPasswordResetCode = this.sendPasswordResetCode.bind(this);
    }

    componentDidMount() {
    }

    sendPasswordResetCode() {
        this.props.navigation.navigate('Components');
    }

    render() {
        const {
            isLoading,
            isVerificationCodeValid,
            verificationCode
        } = this.state;
        return (

            <ScrollView style={[styles.container]} horizontal={false}>
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
                            value={verificationCode}
                            keyboardAppearance="light"
                            autoFocus={false}
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            returnKeyType="next"
                            inputStyle={{marginLeft: 10}}
                            placeholder={'Email Address'}
                            containerStyle={{
                                borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                            }}
                            onChangeText={verificationCode => this.setState({verificationCode})}
                            errorMessage={
                                isVerificationCodeValid ? null : 'Please enter a valid Email Address'
                            }
                        />
                    </View>
                    <View>
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title="Send Password Reset Email"
                            onPress={() => this.props.navigation.navigate('PasswordResetScreen')}
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
    },
    helpContainer: {
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
