import React, {Component} from 'react';
import appData from "../../constants/app";
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity, UIManager, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, CheckBox, Image, Input} from 'react-native-elements';

import {FontAwesome} from '@expo/vector-icons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import {tryAuth} from '../../store/actions/authActions';
import Colors from "../../constants/colors";
import {getDeviceId, validateEmail} from "../../utils/helper/helper";
import * as _ from "lodash";
import globalStyles from "../../constants/globalStyle";
import LocationPicker from "../../components/Picker/Location/LocationPicker";

// Enable LayoutAnimation on Android
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            gender: "male",
            contactNumber: "",
            location: {
                address: "",
                latitude: "",
                longitude: ""
            },
            errors: {}
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
        const {email, firstName, lastName, password, confirmPassword, contactNumber, location} = this.state;
        const {address} = location;
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

        this.setState({errors: errors});
        return _.isEmpty(errors);
    }

    async registerHandler() {
        // Check for form validation
        if (!this.isRegisterFormValid()) {
            return;
        }

        // Start processing form
        const {email, password, firstName, lastName, gender, contactNumber, location} = this.state;
        const {address, latitude, longitude} = location;
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
    }

    onChangeHandler(data) {
        this.setState(data);
    }

    render() {
        const {
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            gender,
            contactNumber,
            location,
            errors,
        } = this.state;
        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
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
                        <View style={globalStyles.formRow}>
                            <Input
                                leftIcon={
                                    <FontAwesome
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
                        </View>
                        <View style={globalStyles.formRow}>
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
                                autoCapitalize='none'
                            />
                        </View>
                        <View style={globalStyles.formRow}>
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
                        </View>
                        <View style={globalStyles.formRow}>
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
                        </View>

                        <View style={globalStyles.formRow}>
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
                        </View>
                        <View style={globalStyles.formRow}>
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
                        </View>
                        
                        <View style={globalStyles.formFlexColumn}>
                            <LocationPicker
                                location={location.address}
                                onChange={location => this.onChangeHandler({location})}
                            />
                            {
                                errors.address &&
                                <Text style={globalStyles.error}>{errors.address}</Text>
                            }
                        </View>

                        <View style={globalStyles.formFlexRow}>
                        
                            <CheckBox
                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0 }}
                                title='Male'
                                checkedIcon='dot-circle-o'
                                checkedColor={Colors.primary}
                                uncheckedIcon='circle-o'
                                checked={gender === 'male'}
                                onPress={() => this.onChangeHandler({gender: "male"})}
                                size={30}
                            />
                            <CheckBox
                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0 }}
                                title='Female'
                                checkedIcon='dot-circle-o'
                                checkedColor={Colors.primary}
                                uncheckedIcon='circle-o'
                                checked={gender === 'female'}
                                size={30}
                                onPress={() => this.onChangeHandler({gender: "female"})}
                            />
                        </View>
                        <View style={[globalStyles.formFlexRow, { marginBottom: 20 }]}>
                            <Button
                                buttonStyle={globalStyles.btnPrimary}
                                containerStyle={globalStyles.btnPrimaryContainer}
                                titleStyle={globalStyles.btnPrimaryTitle}
                                activeOpacity={0.8}
                                title="Register"
                                onPress={this.registerHandler}
                            />
                        </View>
                        <View style={[globalStyles.formFlexRow, { justifyContent: "space-between", marginBottom: 10,}]}>
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
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
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

});

const mapStateToProps = state => {
    return {
        auth: state.auth,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAuth: async (authData, authMode) => await dispatch(tryAuth(authData, authMode)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);