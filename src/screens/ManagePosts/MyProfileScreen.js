import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Colors from '../../constants/colors';
import globalStyles from "../../constants/globalStyle";
import {Avatar, Button, CheckBox, Divider} from "react-native-elements/src/index";
import {connect} from "react-redux";
import {ImagePicker, Permissions} from "expo";
import Icon from 'react-native-vector-icons/FontAwesome';
import {updateMyProfile, updatePassword} from "../../store/actions/authActions";
import alertMessage from "../../components/Alert";
import * as _ from "lodash";
import {setLocation} from "../../store/actions/formActions";
import PickLocation from "../../components/Picker/LocationPicker";

class MyProfileScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            gender: '',
            contactNumber: '',
            email: '',
            profilePicture: null,
            newFirstName: '',
            newLastName: '',
            newGender: '',
            newContactNumber: '',
            newProfilePicture: null,
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            isSaveProfilePicture: false,
            isSaveProfile: false,
            isSavePassword: false,
            isSavingProfilePicture: false,
            isSavingProfile: false,
            isSavingPassword: false,
            errors: {}
        };

        this.pickProfilePictureHandler = this.pickProfilePictureHandler.bind(this);
        this.removeImageHandler = this.removeImageHandler.bind(this);
        this.saveProfilePictureHandler = this.saveProfilePictureHandler.bind(this);
        this.editProfileHandler = this.editProfileHandler.bind(this);
        this.saveProfileHandler = this.saveProfileHandler.bind(this);
        this.editPasswordHandler = this.editPasswordHandler.bind(this);
        this.savePasswordHandler = this.savePasswordHandler.bind(this);
        this.cancelEditHandler = this.cancelEditHandler.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        this._isMounted && this.setData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    setData() {
        const {user} = this.props.auth;
        this._isMounted && this.setState({
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            fullName: user.full_name,
            gender: user.gender,
            contactNumber: user.contact_number,
            email: user.email,
            profilePicture: user.profile_pic,
            newProfilePicture: null,
        });

        this.props.setLocation({
            address: user.address,
            latitude: user.latitude,
            longitude: user.longitude
        })
    }

    removeImageHandler() {
        this.setState({
            newProfilePicture: null,
            isSaveProfilePicture: false,
        })
    }

    pickProfilePictureHandler = async () => {
        let { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (status !== 'granted') {
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
        });

        if (!result.cancelled) {
            this.setState({
                newProfilePicture: result,
                isSaveProfilePicture: true,
            });
        }
    };

    async saveProfilePictureHandler() {
        const {newProfilePicture} = this.state;

        let error = '';

        if (error) {
            return alertMessage({title: "Error", body: "Something went wrong!"});
        }

        this.setState({isSavingProfilePicture: true});
        let formData = new FormData();

        if (newProfilePicture &&  ('cancelled' in newProfilePicture)) {
            formData.append('profile_pic', {uri: newProfilePicture.uri, name: 'newprofilepic.jpg', type: 'image/jpg'});
        }
        await this.props.updateMyProfile(formData).then(res => {
        }).catch(err => {
        });

        this.setData();
        this.cancelEditHandler("profile-picture");
        this.setState({isSavingProfilePicture: false});
    }

    editProfileHandler() {
        const { firstName, lastName, gender, contactNumber} = this.state;
        this.setState({
            isSaveProfile: true,
            newFirstName: firstName,
            newLastName: lastName,
            newGender: gender,
            newContactNumber: contactNumber
        });
    }

    isProfileFormValid() {
        const {newFirstName, newLastName, newContactNumber} = this.state;
        const {address} = this.props.forms.location;

        let errors = {};

        if (!newFirstName) { errors.newFirstName = 'First Name is required'; }
        if (!newLastName) { errors.newLastName = 'Last Name is required'; }
        if (!newContactNumber) { errors.newContactNumber = 'Contact number is required!'; }
        if (_.isEmpty(address)) { errors.address = "Location is required"; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    async saveProfileHandler() {
        const {newFirstName, newLastName, newGender, newContactNumber} = this.state;
        const {address, latitude, longitude} = this.props.forms.location;

        if (!this.isProfileFormValid()) {
            alertMessage({title: "Error", body: "Validation failed"});
            return;
        }

        this.setState({isSavingProfile: true});
        let formData = new FormData();
        formData.append('first_name', newFirstName);
        formData.append('last_name', newLastName);
        formData.append('gender', newGender);
        formData.append('contact_number', newContactNumber);
        formData.append('address', address);
        formData.append('latitude', latitude);
        formData.append('longitude', longitude);

        await this.props.updateMyProfile(formData).then(res => {
        }).catch(err => {
        });

        this.setData();
        this.cancelEditHandler("profile");
        this.setState({isSavingProfile: false});
    }

    editPasswordHandler() {
        this.setState({
            isSavePassword: true
        });
    }

    isPasswordFormValid() {
        const {currentPassword, newPassword, confirmNewPassword} = this.state;
        let errors = {};

        if (!currentPassword) { errors.currentPassword = 'Current Password is required'; }
        if (newPassword.length < 8) { errors.newPassword= 'Password must be at least 8 characters'; }
        if (confirmNewPassword !== newPassword) { errors.confirmNewPassword= 'Password and confirm password must match'; }

        this.setState({errors});
        return _.isEmpty(errors);
    }

    async savePasswordHandler() {
        const {currentPassword, newPassword} = this.state;

        if (!this.isPasswordFormValid()) {
            alertMessage({title: "Error", body: "Validation failed"});
            return;
        }

        this.setState({isSavingPassword: true});
        let formData = {
            old_password: currentPassword,
            new_password: newPassword
        };

        await this.props.updatePassword(formData).then(res => {
        }).catch(err => {
        });

        this.setData();
        this.cancelEditHandler("password");
        this.setState({isSavingPassword: false});
    }

    cancelEditHandler(type) {
        if (type === "profile-picture") {
            this.setState({
                isSaveProfilePicture: false,
                newProfilePicture: null
            })
        }

        if (type === "profile") {
            this.setState({
                isSaveProfile: false,
                newFirstName: '',
                newLastName: '',
                newGender: '',
                newContactNumber: '',
            })
        }

        if (type === "password") {
            this.setState({
                isSavePassword: false,
                currentPassword: '',
                newPassword: '',
                confirmNewPassword: '',
            })
        }
    }



    render() {
        const {
            firstName, lastName, email, gender, contactNumber,
            profilePicture, newProfilePicture, isSaveProfilePicture, isSaveProfile, isSavePassword,
            currentPassword, newPassword, confirmNewPassword,
            newFirstName, newLastName, newGender, newContactNumber,
            isSavingProfilePicture, isSavingProfile, isSavingPassword, errors
        } = this.state;
        const {address} = this.props.forms.location;

        const profilePictureSource = profilePicture ? {uri: profilePicture} : require('../../../assets/images/user-hp.png');

        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <View style={globalStyles.scrollViewContentView}>
                    
                    <View style={styles.profileContainer}>
                        <View style={styles.profileAvatarContainer}>
                            {
                                newProfilePicture && newProfilePicture.uri ?
                                <View>
                                    <Icon
                                        color={Colors.primary}
                                        name="trash"
                                        type="font-awesome"
                                        size={22}
                                        onPress={this.removeImageHandler}
                                    />
                                    <Avatar
                                        rounded
                                        size="large"
                                        source={{uri: newProfilePicture.uri}}
                                    />
                                </View>
                                :
                                <Avatar
                                    rounded
                                    size="large"
                                    source={profilePictureSource}
                                />
                            }

                        </View>
                        <View style={styles.profileAvatarActionContainer}>
                            {
                                isSaveProfilePicture ?
                                    <TouchableOpacity
                                        onPress={this.saveProfilePictureHandler}
                                        disabled={this.isSaveProfilePicture}
                                        loading={this.isSaveProfilePicture}
                                    >
                                        <View style={globalStyles.btnPrimaryOutline}>
                                            <Text style={globalStyles.btnPrimaryOutlineTitle}>Save Profile Picture</Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={this.pickProfilePictureHandler}>
                                        <View style={globalStyles.btnPrimaryOutline}>
                                            <Text style={globalStyles.btnPrimaryOutlineTitle}>Change Profile Picture</Text>
                                        </View>
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSaveProfile ?
                            <View style={styles.profileRow}>
                                <View style={styles.profileLabel}>
                                    <Text style={globalStyles.formTitle}>First Name</Text>
                                </View>
                                <View style={styles.profileInput}>
                                    <TextInput
                                        style={globalStyles.textInput}
                                        value={newFirstName}
                                        onChangeText={newFirstName => this.setState({newFirstName})}
                                    />
                                    <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newFirstName ? errors.newFirstName: ''}</Text>
                                </View>
                            </View>
                            :
                            <View style={styles.profileRow}>
                                <View style={styles.profileLabel}>
                                    <Text style={globalStyles.formTitle}>First Name</Text>
                                </View>
                                <View style={styles.profileInput}>
                                    <Text style={styles.postContent}>{firstName}</Text>
                                </View>
                            </View>
                        }

                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSaveProfile ?
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Last Name</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <TextInput
                                            style={globalStyles.textInput}
                                            value={newLastName}
                                            onChangeText={newLastName => this.setState({newLastName})}
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newLastName ? errors.newLastName: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Last Name</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <Text style={styles.postContent}>{lastName}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        <View style={styles.profileRow}>
                            <View style={styles.profileLabel}>
                                <Text style={globalStyles.formTitle}>Email</Text>
                            </View>
                            <View style={styles.profileInput}>
                                <Text style={styles.postContent}>{email}</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSavePassword ?
                                <View>
                                    <View style={styles.profileRow}>
                                        <View style={styles.profileLabel}>
                                            <Text style={globalStyles.formTitle}>Current Password</Text>
                                        </View>
                                        <View style={styles.profileInput}>
                                            <TextInput
                                                style={globalStyles.textInput}
                                                secureTextEntry={true}
                                                value={currentPassword}
                                                placeholder="Current Password"
                                                onChangeText={currentPassword => this.setState({currentPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.currentPassword ? errors.currentPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.profileRow}>
                                        <View style={styles.profileLabel}>
                                            <Text style={globalStyles.formTitle}>New Password</Text>
                                        </View>
                                        <View style={styles.profileInput}>
                                            <TextInput
                                                style={globalStyles.textInput}
                                                secureTextEntry={true}
                                                value={newPassword}
                                                placeholder="New Password"
                                                onChangeText={newPassword => this.setState({newPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newPassword ? errors.newPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.profileRow}>
                                        <View style={styles.profileLabel}>
                                            <Text style={globalStyles.formTitle}>Confirm Password</Text>
                                        </View>
                                        <View style={styles.profileInput}>
                                            <TextInput
                                                style={globalStyles.textInput}
                                                secureTextEntry={true}
                                                value={confirmNewPassword}
                                                placeholder="Confirm New Password"
                                                onChangeText={confirmNewPassword => this.setState({confirmNewPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.confirmNewPassword ? errors.confirmNewPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.profileRowActions}>
                                        <Button
                                            title="Update password"
                                            buttonStyle={globalStyles.btnPrimary}
                                            buttonSize={5}
                                            onPress={this.savePasswordHandler}
                                            loading={isSavingPassword}
                                            disabled={isSavingPassword}
                                        />
                                        <Button
                                            title="Cancel"
                                            buttonStyle={globalStyles.btnSecondary}
                                            buttonSize={5}
                                            onPress={() => this.cancelEditHandler('password')}
                                        />
                                    </View>
                                </View>
                            :
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Password</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <Button
                                            title="Update password"
                                            buttonStyle={globalStyles.btnPrimary}
                                            buttonSize={5}
                                            onPress={this.editPasswordHandler}
                                        />
                                    </View>
                                </View>
                        }

                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSaveProfile ?
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Gender</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <View style={{flexDirection: 'row', width: '100%'}}>
                                            <CheckBox
                                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0 }}
                                                title='Male'
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checkedColor={Colors.primary}
                                                checked={newGender === 'male'}
                                                onPress={() => this.setState({newGender: "male"})}
                                            />

                                            <CheckBox
                                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0}}
                                                title='Female'
                                                checkedIcon='dot-circle-o'
                                                checkedColor={Colors.primary}
                                                uncheckedIcon='circle-o'
                                                checked={newGender === 'female'}
                                                onPress={() => this.setState({newGender: "female"})}
                                            />
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Gender</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <Text style={styles.postContent}>{gender}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSaveProfile ?
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Phone No.</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <TextInput style={globalStyles.textInput}
                                                   value={newContactNumber}
                                                   onChangeText={newContactNumber => this.setState({newContactNumber})}
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newContactNumber ? errors.newContactNumber: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Phone No.</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <Text style={styles.postContent}>{contactNumber}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.mediumGray}}/>

                    <View style={styles.profileRowContainer}>
                        {
                            isSaveProfile ?
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Address</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <PickLocation
                                            value={this.props.forms.location.address}
                                            navigation={this.props.navigation}
                                            errorMessage={errors.address ? errors.address : null}
                                            backScreen="MyProfile"
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newContactNumber ? errors.newContactNumber: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={styles.profileRow}>
                                    <View style={styles.profileLabel}>
                                        <Text style={globalStyles.formTitle}>Address</Text>
                                    </View>
                                    <View style={styles.profileInput}>
                                        <Text style={styles.postContent}>{address}</Text>
                                    </View>
                                </View>
                        }
                    </View>
                    
                    {
                        isSaveProfile ?
                        <View style={styles.profileRowActions}>
                            <Button
                                title="Save Profile"
                                buttonStyle={globalStyles.btnPrimary}
                                buttonSize={5} onPress={this.saveProfileHandler}
                                loading={isSavingProfile} disabled={isSavingProfile}
                            />
                            <Button
                                title="Cancel"
                                buttonStyle={globalStyles.btnSecondary}
                                buttonSize={20}
                                onPress={() => this.cancelEditHandler('profile')}
                            />
                        </View>
                        :
                        <View style={styles.profileRow}>
                            <Button
                                title="Edit Profile"
                                buttonStyle={globalStyles.btnPrimary}
                                buttonSize={5} onPress={this.editProfileHandler}
                            />
                        </View>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
    profileContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 20,
    },

    profileAvatarContainer: {
        paddingTop: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },

    profileAvatarActionContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    profileRowContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    profileRow: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
    },

    profileRowActions: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 10,
        marginBottom: 10,
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },

    profileLabel: {
    },

    profileInput: {
    },


    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    postTitle: {
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.darkGray,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.darkGray,
        fontSize: 16,
        lineHeight: 20
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
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
        updateMyProfile: (formData) => dispatch(updateMyProfile(formData)),
        updatePassword: (formData) => dispatch(updatePassword(formData)),
        updatePassword: (formData) => dispatch(updatePassword(formData)),
        setLocation: (location) => dispatch(setLocation(location)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
