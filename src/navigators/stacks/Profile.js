import React from 'react';
import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Icon} from 'react-native-elements';
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PageDetailScreen from "../../screens/Page/PageDetailScreen";
import MyProfileScreen from "../../screens/ManagePosts/MyProfileScreen";

const LogoUrl = require('../../../assets/images/logo-icon.png');

const ProfileStacks = createStackNavigator({
    MyProfile: {
        screen: MyProfileScreen,
        path: '/',
        navigationOptions: ({navigation}) => ({
            title: '',
            headerLeft: (
                <Icon
                    name="arrow-back"
                    size={30}
                    type="ionicons"
                    containerStyle={{marginLeft: 10}}
                    onPress={() => navigation.navigate('Categories')}
                />
            ),
            headerRight: (
                <Icon
                    name="menu"
                    size={30}
                    type="entypo"
                    containerStyle={{marginRight: 10}}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }),
    },
    UpdateProfilePicture: {
        screen: PostDetailScreen,
        path: '/update-profile-picture',
        navigationOptions: {
            title: 'Update Profile Picture',
        },
    },
    UpdateProfile: {
        screen: PostDetailScreen,
        path: '/edit-profile',
        navigationOptions: {
            title: 'Update Profile',
        },
    },
    UpdatePassword: {
        screen: PageDetailScreen,
        path: '/update-password',
        navigationOptions: {
            title: 'Update Password',
        },
    },
});

export default ProfileStacks;
