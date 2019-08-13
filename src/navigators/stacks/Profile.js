import React from 'react';
import {createStackNavigator} from 'react-navigation';
import MyProfileScreen from "../../screens/ManagePosts/MyProfileScreen";
import withCustomNav from "../../components/HOC/withCustomNav";

const ProfileStacks = createStackNavigator({
    MyProfile: {
        screen: withCustomNav(MyProfileScreen),
        path: '/my-profile',
        params: {
            title: 'My Profile'
        }
    },
});

export default ProfileStacks;
