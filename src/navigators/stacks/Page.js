import React from 'react';
import {createStackNavigator, DrawerActions} from 'react-navigation';
import PageDetailScreen from "../../screens/Page/PageDetailScreen";
import {Icon, Image} from 'react-native-elements';

const LogoUrl = require('../../../assets/icons/icon.png');

const navigationOptions = ({navigation}) => ({
    title: 'Loksewa',
    headerLeft: (
        <Image style={{marginLeft: 10, width: 40, height: 40}} source={LogoUrl}/>
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
});

const Page = createStackNavigator({
    AboutUs: {
        screen: PageDetailScreen,
        path: '/about-us',
        navigationOptions: navigationOptions,
    },
    ContactUs: {
        screen: PageDetailScreen,
        path: '/contact-us',
        navigationOptions: navigationOptions,
    },
    Privacy: {
        screen: PageDetailScreen,
        path: '/privacy',
        navigationOptions: navigationOptions,
    },
    TermsAndConditions: {
        screen: PageDetailScreen,
        path: '/terms-and-conditions',
        navigationOptions: navigationOptions,
    },
    SecurityTips: {
        screen: PageDetailScreen,
        path: '/security-tips',
        navigationOptions: navigationOptions,
    }
});

export default Page;
