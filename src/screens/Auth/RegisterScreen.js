import React, {Component} from 'react';
import appData from "../../constants/app";
import * as Platform from 'react-native';
import {KeyboardAvoidingView, ScrollView, StyleSheet, TouchableOpacity, UIManager, View} from 'react-native';
import {Constants} from 'expo';
import {connect} from 'react-redux';
import {Button, CheckBox, Image, Input} from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import socialColor from "../../constants/socialColors";
import {tryAuth} from '../../store/actions/authActions';
import Colors from "../../constants/colors";
import {getDeviceId, validateEmail} from "../../utils/helper/helper";
import * as _ from "lodash";
import globalStyles from "../../constants/globalStyle";
import PickLocation from "../../components/PickLocation/PickLocation";
import {resetRegisterForm, updateRegisterForm} from "../../store/actions/formActions";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            isLoading: false,
        };

        this.registerHandler = this.registerHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && this.setState({fontLoaded: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    isRegisterFormValid() {
        const {email, firstName, lastName, password, confirmPassword, contactNumber} = this.props.forms.register;
        const {address} = this.props.forms.location;
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

        if (_.isEmpty(address)) {
            errors.address = "Location is required";
        }

        this.props.updateRegisterForm({errors: errors});
        return _.isEmpty(errors);
    }

    async registerHandler() {
        // Check for form validation
        if (!this.isRegisterFormValid()) {
            return;
        }

        // Start processing form
        this.setState({isLoading: true});
        const {email, password, firstName, lastName, gender, contactNumber} = this.props.forms.register;
        const {address, latitude, longitude} = this.props.forms.location;
        const deviceId = await getDeviceId();
        await this.props.onTryAuth({
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            gender: gender,
            contactNumber: contactNumber,
            deviceId: deviceId,
            address: address,
            latitude: latitude,
            longitude: longitude
        }, 'register').then(() => {
            if (this.props.auth.isLoggedIn && !this.props.auth.user.verified) {
                this.props.navigation.navigate('VerificationScreen');
            } else if (this.props.auth.isLoggedIn && this.props.auth.user.verified) {
                this.props.navigation.navigate('App');
            }
        }).catch(err => {
        });

        this._isMounted && this.props.resetRegisterForm();
        this._isMounted && this.setState({isLoading: true});
    }

    onChangeHandler(data) {
        const test = data;
        console.log(data);
        this.props.updateRegisterForm(test);
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
        } = this.props.forms.register;
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
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
                                <Image style={{width: 100, height: 100}} source={appData.app.LOGO_URL}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.formContainer}>
                        <Input
                            leftIcon={
                                <Icon
                                    name="envelope-o"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16,}}
                                />
                            }
                            value={email}
                            keyboardType="email-address"
                            placeholder={'Email'}
                            inputStyle={globalStyles.inputStyle}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            onChangeText={email => this.onChangeHandler({email})}
                            errorMessage={errors.email ? errors.email : null}
                            autoCapitalize='none'
                        />
                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="lock"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16,}}
                                />
                            }
                            value={password}
                            secureTextEntry={true}
                            inputStyle={globalStyles.inputStyle}
                            containerStyle={globalStyles.inputViewContainer}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            placeholder={'Password'}
                            onChangeText={password => this.onChangeHandler({password})}
                            errorMessage={errors.password ? errors.password : null}
                        />

                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="lock"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16,}}
                                />
                            }
                            value={confirmPassword}
                            secureTextEntry={true}
                            containerStyle={globalStyles.inputViewContainer}
                            inputStyle={globalStyles.inputStyle}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            placeholder={'Confirm password'}
                            onChangeText={confirmPassword => this.onChangeHandler({confirmPassword})}
                            errorMessage={errors.confirmPassword ? errors.confirmPassword : null}
                        />


                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="notebook"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16,}}
                                />
                            }
                            value={firstName}
                            containerStyle={globalStyles.inputViewContainer}
                            inputStyle={globalStyles.inputStyle}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            placeholder={'First Name'}
                            onChangeText={firstName => this.onChangeHandler({firstName})}
                            errorMessage={errors.firstName ? errors.firstName : null}
                        />


                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="notebook"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16}}
                                />
                            }
                            value={lastName}
                            containerStyle={globalStyles.inputViewContainer}
                            inputStyle={globalStyles.inputStyle}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            placeholder={'Last Name'}
                            onChangeText={lastName => this.onChangeHandler({lastName})}
                            errorMessage={errors.lastName ? errors.lastName : null}
                        />

                        <Input
                            leftIcon={
                                <SimpleIcon
                                    name="phone"
                                    color={Colors.primary}
                                    size={25}
                                    style={{backgroundColor: 'transparent', fontSize:16,}}
                                />
                            }
                            value={contactNumber}
                            containerStyle={globalStyles.inputViewContainer}
                            inputStyle={globalStyles.inputStyle}
                            inputContainerStyle={globalStyles.inputContainerStyle}
                            placeholder={'Mobile No.'}
                            onChangeText={contactNumber => this.onChangeHandler({contactNumber})}
                            errorMessage={errors.contactNumber ? errors.contactNumber : null}
                        />

                        <PickLocation
                            value={this.props.forms.location.address}
                            navigation={this.props.navigation}
                            errorMessage={errors.address ? errors.address : null}
                            backScreen="RegisterScreen"
                        />

                        <View style={{marginLeft: 10, flexDirection: 'row', width: '100%'}}>
                            <CheckBox
                                containerStyle={{width: '30%', backgroundColor: 'transparent', borderColor: 'transparent'}}
                                title='Male'
                                checkedIcon='dot-circle-o'
                                checkedColor={Colors.primary}
                                uncheckedIcon='circle-o'
                                checked={gender === 'male'}
                                onPress={() => this.onChangeHandler({gender: "male"})}
                                size={30}
                            />

                            <CheckBox
                                containerStyle={{width: '30%', backgroundColor: 'transparent', borderColor: 'transparent'}}
                                title='Female'
                                checkedIcon='dot-circle-o'
                                checkedColor={Colors.primary}
                                uncheckedIcon='circle-o'
                                checked={gender === 'female'}
                                size={30}
                                onPress={() => this.onChangeHandler({gender: "female"})}
                            />
                        </View>

                        <Button
                            buttonStyle={globalStyles.btnPrimary}
                            containerStyle={globalStyles.btnPrimaryContainer}
                            titleStyle={globalStyles.btnPrimaryTitle}
                            activeOpacity={0.8}
                            title="Register"
                            onPress={this.registerHandler}
                            loading={isLoading}
                            disabled={isLoading}
                        />
                        <View style={styles.helpContainer}>
                            <Button
                                title={'Forgot Password?'}
                                titleStyle={globalStyles.btnLinkTitle}
                                buttonStyle={[globalStyles.btnLink]}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('ForgotPasswordScreen')}
                            />
                            <Button
                                title={'Login'}
                                titleStyle={globalStyles.btnLinkTitle}
                                buttonStyle={[globalStyles.btnLink, globalStyles.btnLinkRight]}
                                underlayColor="transparent"
                                onPress={() => this.props.navigation.navigate('LoginScreen')}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
        marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
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
        backgroundColor: Colors.primary,
        borderRadius: 25,
        height: 50,
        width:  appData.app.SCREEN_WIDTH - 65,
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
        auth: state.auth,
        forms: state.forms
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAuth: async (authData, authMode) => await dispatch(tryAuth(authData, authMode)),
        updateRegisterForm: (data) => dispatch(updateRegisterForm(data)),
        resetRegisterForm: () => dispatch(resetRegisterForm())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);