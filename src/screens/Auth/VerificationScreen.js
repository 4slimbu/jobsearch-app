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
import {authAutoSignIn, facebookLogin, tryAuth, verifyEmail} from "../../store/actions/authActions";
import {connect} from "react-redux";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class VerificationScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            verificationCode: '',
            verificationStatus: 'fresh'
        };

        this.verifyEmailHandler = this.verifyEmailHandler.bind(this);
        this.tryAgainHandler = this.tryAgainHandler.bind(this);
        this.continueHandler = this.continueHandler.bind(this);
    }

    verifyEmailHandler() {
        this.setState({verificationStatus: 'processing'});

        this.props.verifyEmail(this.state.verificationCode).then(res => {
            this.setState({
                verificationStatus: this.props.auth.user.verified ? 'successful' : 'unsuccessful'
            })
        }).catch(err => {
            this.setState({
                verificationStatus: this.props.auth.user.verified ? 'successful' : 'unsuccessful'
            })
        });
    }

    tryAgainHandler() {
        this.setState({verificationStatus: 'fresh'});
    }

    continueHandler() {
        this.props.navigation.navigate('App');
    }

    render() {
        const {
            isLoading,
            verificationCode,
            verificationStatus
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
                    {
                        verificationStatus === 'processing' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <ActivityIndicator size={50} color={Colors.primary1}/>
                        </View>
                    }
                    {
                        verificationStatus === 'successful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Icon color='green' name="check" size={62}/>
                                <Text>Verification Successful</Text>
                            </View>
                        </View>
                    }
                    {
                        verificationStatus === 'unsuccessful' &&
                        <View style={{flex: 1, height: 150, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{alignItems: 'center'}}>
                                <Icon color='red' name="close" size={62}/>
                                <Text>Verification Failed</Text>
                            </View>
                        </View>
                    }
                    {
                        verificationStatus === 'fresh' &&
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
                                value={verificationCode}
                                keyboardAppearance="light"
                                autoFocus={false}
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                                inputStyle={{marginLeft: 10}}
                                placeholder={'Verification Code'}
                                containerStyle={{
                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                }}
                                onChangeText={verificationCode => this.setState({verificationCode})}
                            />
                        </View>

                    }
                    <View>
                        <Button
                            buttonStyle={styles.loginButton}
                            containerStyle={{marginTop: 32, flex: 0}}
                            activeOpacity={0.8}
                            title={verificationStatus === 'unsuccessful' ? 'Try Again' : (verificationStatus === 'successful' ? 'Continue': 'Verify Email')}
                            onPress={verificationStatus === 'unsuccessful' ? this.tryAgainHandler : (verificationStatus === 'successful' ? this.continueHandler: this.verifyEmailHandler)}
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        verifyEmail: (verificationCode) => dispatch(verifyEmail(verificationCode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerificationScreen);