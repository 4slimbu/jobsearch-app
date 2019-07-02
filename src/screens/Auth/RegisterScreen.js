import React, {Component} from 'react';
import {Dimensions, KeyboardAvoidingView, ScrollView,ImageBackground, StyleSheet, Text, UIManager, View,} from 'react-native';
import {connect} from 'react-redux';
import {AppLoading, LinearGradient} from 'expo';
import {Button, CheckBox, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import socialColor from "../../constants/socialColors";
import {tryAuth} from '../../store/actions/authActions';
import {APP_NAME} from "../../constants/app";
import Colors from "../../constants/colors";
import {getDeviceId, validateEmail} from "../../utils/helper/helper";
import * as _ from "lodash";

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const LogoUrl = require('../../../assets/icons/icon.png');
const BG_IMAGE = require('../../../assets/images/wallpaper_4.jpg');


// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            isLoading: false,
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "male",
            contactNumber: "",
            errors: {}
        };

        this.registerHandler = this.registerHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.setState({fontLoaded: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isRegisterFormValid() {
        const {email, firstName, lastName, password, confirmPassword, contactNumber} = this.state;
        let errors = {};

        if (!validateEmail(email)) {
            errors.email = "Email is invalid";
        }

        if (_.isEmpty(firstName)) {
            errors.firstName = "First Name is required";
        }

        if (_.isEmpty(lastName)) {
            errors.lastName = "Last Name is required";
        }

        if (_.isEmpty(contactNumber)) {
            errors.contactNumber = "Contact number is required";
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

    async registerHandler() {
        // Check for form validation
        if (!this.isRegisterFormValid()) {
            return;
        }

        // Start processing form
        this.setState({isLoading: true});
        const {email, password, firstName, lastName, gender, contactNumber} = this.state;
        const deviceId = await getDeviceId();
        await this.props.onTryAuth({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            contactNumber: contactNumber,
            deviceId: deviceId
        }, 'register').then(() => {
            if (this.props.auth.isLoggedIn && !this.props.auth.user.verified) {
                this.props.navigation.navigate('VerificationScreen');
            } else if (this.props.auth.isLoggedIn && this.props.auth.user.verified) {
                this.props.navigation.navigate('App');
            }
        }).catch(err => {
        });

        this._isMounted && this.setState({isLoading: true});
    }

    render() {
        const {
            isLoading,
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            gender,
            contactNumber,
            errors
        } = this.state;
        return (
            <ScrollView style={[styles.container]}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <LinearGradient
                            colors={[ '#f53554', '#ffc4c4']}
                            style={styles.overlay}/>
                    <KeyboardAvoidingView style={{
                        flex: 1, justifyContent: 'center',
                        alignItems: 'center', marginTop: 100, marginBottom: 100
                    }}
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
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={email}
                                keyboardType="email-address"
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'Email'}
                                placeholderTextColor={Colors.white}
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
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={password}
                                secureTextEntry={true}
                                containerStyle={{
                                    marginTop: 16,
                                    borderBottomColor: 'rgba(0, 0, 0, 0.38)',
                                }}
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'Password'}
                                placeholderTextColor={Colors.white}
                                onChangeText={password => this.setState({password})}
                                errorMessage={errors.password ? errors.password : null}
                            />

                            <Input
                                leftIcon={
                                    <SimpleIcon
                                        name="lock"
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={confirmPassword}
                                secureTextEntry={true}
                                containerStyle={{
                                    marginTop: 16,
                                    borderBottomColor: Colors.white,
                                }}
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'Confirm password'}
                                placeholderTextColor={Colors.white}
                                onChangeText={confirmPassword => this.setState({confirmPassword})}
                                errorMessage={errors.confirmPassword ? errors.confirmPassword : null}
                            />


                            <Input
                                leftIcon={
                                    <SimpleIcon
                                        name="notebook"
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={firstName}
                                containerStyle={{
                                    marginTop: 16,
                                    borderBottomColor: 'rgba(255, 255, 255, 1))',
                                }}
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'First Name'}
                                placeholderTextColor={Colors.white}
                                onChangeText={firstName => this.setState({firstName})}
                                errorMessage={errors.firstName ? errors.firstName : null}
                            />


                            <Input
                                leftIcon={
                                    <SimpleIcon
                                        name="notebook"
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={lastName}
                                containerStyle={{
                                    marginTop: 16,
                                    borderBottomColor: 'rgba(255, 255, 255, 1)',
                                }}
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'Last Name'}
                                placeholderTextColor={Colors.white}
                                onChangeText={lastName => this.setState({lastName})}
                                errorMessage={errors.lastName ? errors.lastName : null}
                            />

                            <Input
                                leftIcon={
                                    <SimpleIcon
                                        name="phone"
                                        color="rgba(255, 255, 255, 1)"
                                        size={25}
                                        style={{backgroundColor: 'transparent', fontSize:16,}}
                                    />
                                }
                                value={contactNumber}
                                containerStyle={{
                                    marginTop: 16,
                                    borderBottomColor: 'rgba(255, 255, 255, 1)',
                                }}
                                inputStyle={{marginLeft: 10,color:Colors.white,}}
                                placeholder={'Mobile No.'}
                                placeholderTextColor={Colors.white}
                                onChangeText={contactNumber => this.setState({contactNumber})}
                                errorMessage={errors.contactNumber ? errors.contactNumber : null}
                            />

                            <View style={{marginLeft: 10, marginTop: 10, flexDirection: 'row', width: '100%'}}>
                                <CheckBox
                                    containerStyle={{width: '30%', backgroundColor: 'transparent', borderColor: 'transparent'}}
                                    title='Male'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={gender === 'male'}
                                    onPress={() => this.setState({gender: "male"})}
                                    size={30}
                                />

                                <CheckBox
                                    containerStyle={{width: '30%', backgroundColor: 'transparent', borderColor: 'transparent'}}
                                    title='Female'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    checked={gender === 'female'}
                                    size={30}
                                    onPress={() => this.setState({gender: "female"})}
                                />
                            </View>


                            <Button
                                buttonStyle={styles.loginButton}
                                containerStyle={{marginTop: 32, flex: 0}}
                                activeOpacity={0.8}
                                title="Register"
                                onPress={this.registerHandler}
                                titleStyle={styles.loginTextButton}
                                loading={isLoading}
                                disabled={isLoading}
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </ScrollView>
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
        backgroundColor: '#f53756',
        borderRadius: 5,
        height: 50,
        width:  SCREEN_WIDTH - 65,
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
        color: Colors.white,
        fontSize: 30,
        fontWeight: 'bold',
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
        onTryAuth: async (authData, authMode) => await dispatch(tryAuth(authData, authMode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);