import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../constants/colors';
import {Button, CheckBox, Divider, Image, Input} from "react-native-elements/src/index";
import {connect} from "react-redux";
import {ImagePicker} from "expo";
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

        const profilePictureSource = profilePicture ? {uri: profilePicture} : require('../../../assets/images/placeholder.png');

        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Profile</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <View style={{alignItems: 'center'}}>
                            {
                                newProfilePicture && newProfilePicture.uri ?
                                <View>
                                    <Icon color={Colors.grey1} name="close" size={30} onPress={this.removeImageHandler}/>
                                    <Image source={{uri: newProfilePicture.uri}} style={{width: 100, height: 100, marginTop: 10, marginBottom: 10}}/>
                                </View>
                                :
                                <Image source={profilePictureSource} resizeMode={'contain'}
                                       style={{width: 100, height: 100, marginBottom: 10}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            }

                        </View>
                        <View >
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                {
                                    isSaveProfilePicture ?
                                        <Button title="Save Profile Picture"
                                                buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, marginRight: 10}}
                                                buttonSize={5} onPress={this.saveProfilePictureHandler}
                                                loading={isSavingProfilePicture}
                                                disabled={isSavingProfilePicture}
                                        />
                                        :
                                        <Button title="Change Profile Picture"
                                                buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, marginRight: 10, backgroundColor: Colors.grey3}}
                                                buttonSize={5} onPress={this.pickProfilePictureHandler}/>
                                }
                            </View>

                        </View>

                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSaveProfile ?
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>First Name</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                   value={newFirstName}
                                                   onChangeText={newFirstName => this.setState({newFirstName})}
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newFirstName ? errors.newFirstName: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>First Name</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text style={styles.postContent}>{firstName}</Text>
                                    </View>
                                </View>
                        }

                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSaveProfile ?
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Last Name</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                   value={newLastName}
                                                   onChangeText={newLastName => this.setState({newLastName})}
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newLastName ? errors.newLastName: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Last Name</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text style={styles.postContent}>{lastName}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Email</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>{email}</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSavePassword ?
                                <View>
                                    <View style={{flex: 1, flexDirection: 'row'}}>
                                        <View style={{flex: 2, marginRight: 15}}>
                                            <Text style={styles.postTitle}>Current Password</Text>
                                        </View>
                                        <View style={{flex: 3}}>
                                            <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                       secureTextEntry={true}
                                                       value={currentPassword}
                                                       placeholder="Current Password"
                                                       onChangeText={currentPassword => this.setState({currentPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.currentPassword ? errors.currentPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                                        <View style={{flex: 2, marginRight: 15}}>
                                            <Text style={styles.postTitle}>New Password</Text>
                                        </View>
                                        <View style={{flex: 3}}>
                                            <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                       secureTextEntry={true}
                                                       value={newPassword}
                                                       placeholder="New Password"
                                                       onChangeText={newPassword => this.setState({newPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newPassword ? errors.newPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{flex: 1, flexDirection: 'row', marginTop: 15}}>
                                        <View style={{flex: 2, marginRight: 15}}>
                                            <Text style={styles.postTitle}>Confirm Password</Text>
                                        </View>
                                        <View style={{flex: 3}}>
                                            <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                       secureTextEntry={true}
                                                       value={confirmNewPassword}
                                                       placeholder="Confirm New Password"
                                                       onChangeText={confirmNewPassword => this.setState({confirmNewPassword})}
                                            />
                                            <Text style={{color: Colors.danger, marginTop: 5}}>{errors.confirmNewPassword ? errors.confirmNewPassword: ''}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                        <Button title="Update password" buttonStyle={{ backgroundColor: Colors.danger,  marginBottom: 5, marginRight: 15, paddingTop: 3, paddingBottom: 3}}
                                                buttonSize={5} onPress={this.savePasswordHandler}
                                                loading={isSavingPassword} disabled={isSavingPassword}
                                        />
                                        <Button title="Cancel" buttonStyle={{ backgroundColor: Colors.grey3,  marginBottom: 5, paddingTop: 3, paddingBottom: 3}}
                                                buttonSize={5} onPress={() => this.cancelEditHandler('password')}/>
                                    </View>
                                </View>
                            :
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Password</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Button title="Update password" buttonStyle={{ backgroundColor: Colors.grey3,  marginBottom: 5, paddingTop: 3, paddingBottom: 3}}
                                                buttonSize={5} onPress={this.editPasswordHandler}/>
                                    </View>
                                </View>
                        }

                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSaveProfile ?
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Gender</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <View style={{flexDirection: 'row', width: '100%'}}>
                                            <CheckBox
                                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0 }}
                                                title='Male'
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={newGender === 'male'}
                                                onPress={() => this.setState({newGender: "male"})}
                                            />

                                            <CheckBox
                                                containerStyle={{backgroundColor: 'white', borderColor: 'white', padding: 0}}
                                                title='Female'
                                                checkedIcon='dot-circle-o'
                                                uncheckedIcon='circle-o'
                                                checked={newGender === 'female'}
                                                onPress={() => this.setState({newGender: "female"})}
                                            />
                                        </View>
                                    </View>
                                </View>
                                :
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Gender</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text style={styles.postContent}>{gender}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSaveProfile ?
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Phone No.</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                   value={newContactNumber}
                                                   onChangeText={newContactNumber => this.setState({newContactNumber})}
                                        />
                                        <Text style={{color: Colors.danger, marginTop: 5}}>{errors.newContactNumber ? errors.newContactNumber: ''}</Text>
                                    </View>
                                </View>
                                :
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Phone No.</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text style={styles.postContent}>{contactNumber}</Text>
                                    </View>
                                </View>
                        }
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        {
                            isSaveProfile ?
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Address</Text>
                                    </View>
                                    <View style={{flex: 3}}>
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
                                <View style={{flex: 1, flexDirection: 'row'}}>
                                    <View style={{flex: 2, marginRight: 15}}>
                                        <Text style={styles.postTitle}>Address</Text>
                                    </View>
                                    <View style={{flex: 3}}>
                                        <Text style={styles.postContent}>{address}</Text>
                                    </View>
                                </View>
                        }
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                        {
                            isSaveProfile ?
                                <Button title="Save Profile" buttonStyle={{ marginBottom: 5, paddingTop: 3, paddingBottom: 3, marginRight: 15}}
                                    buttonSize={5} onPress={this.saveProfileHandler}
                                    loading={isSavingProfile} disabled={isSavingProfile}
                                />

                                :
                                <Button title="Edit Profile" buttonStyle={{ marginBottom: 5, paddingTop: 3, paddingBottom: 3, backgroundColor: Colors.grey3, marginRight: 15}}
                                        buttonSize={5} onPress={this.editProfileHandler}/>
                        }
                        {
                            isSaveProfile &&
                            <Button title="Cancel" buttonStyle={{ backgroundColor: Colors.grey3,  marginBottom: 5, paddingTop: 3, paddingBottom: 3}}
                                    buttonSize={20} onPress={() => this.cancelEditHandler('profile')}/>
                        }

                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#acacac',
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
        paddingBottom: 30
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
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
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
