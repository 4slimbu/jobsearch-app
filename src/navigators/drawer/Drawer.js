import {Dimensions, Image, Text, View} from "react-native";
import {createDrawerNavigator} from "react-navigation";
import React from "react";
import LogoutScreen from "../../screens/Auth/LogoutScreen";
import Tabs from "../tabs/Tabs";
import Post from "../stacks/Post";
import Modals from "../modals/Modals";
import {ListItem} from "react-native-elements";
import Colors from "../../constants/colors";
import Profile from "../stacks/Profile";
import Page from "../stacks/Page";

const SCREEN_WIDTH = Dimensions.get('window').width;

const managePostList = [
    {
        name: 'About Us',
        icon: 'assistant',
        linearGradientColors: ['#FF9800', '#F44336'],
        target: 'AboutUs'
    },
    {
        name: 'Contact Us',
        icon: 'mail',
        linearGradientColors: ['#3F51B5', '#2196F3'],
        target: 'ContactUs'
    },
    {
        name: 'Privacy',
        icon: 'fingerprint',
        linearGradientColors: ['#FFD600', '#FF9800'],
        target: 'Privacy'
    },
    {
        name: 'Terms And Conditions',
        icon: 'lightbulb-outline',
        linearGradientColors: ['#4CAF50', '#8BC34A'],
        target: 'TermsAndConditions'
    },
    {
        name: 'Security Tips',
        icon: 'track-changes',
        linearGradientColors: ['#F44336', '#E91E63'],
        target: 'SecurityTips'
    },
    {
        name: 'My Profile',
        icon: 'verified-user',
        linearGradientColors: ['#F44336', '#E91E63'],
        target: 'MyProfile'
    },
    {
        name: 'Logout',
        icon: 'close',
        linearGradientColors: ['#F44336', '#E91E63'],
        target: 'LogOut'
    },
];

const CustomDrawerContentComponent = props => (
    <View style={{flex: 1}}>
        <View
            style={{
                marginTop: 75,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
            onPress={() => props.navigation.navigate('CategoriesScreen')}
        >
            <Image
                source={require('../../../assets/images/logo.png')}
                style={{width: SCREEN_WIDTH * 0.20, height: 50}}
                resizeMode="contain"
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.grey1}}>Loksewa</Text>
        </View>
        <View>
            {managePostList.map((l, i) => (
                <ListItem
                    leftIcon={{
                        name: l.icon,
                        size: 40
                    }}
                    key={i}
                    onPress={() => props.navigation.navigate(l.target, {navTitle: l.name})}
                    title={l.name}
                    subtitle={l.subtitle}
                    // chevron
                    topDivider
                />
            ))}
        </View>
    </View>
);

const Drawer = createDrawerNavigator(
    {
        Tabs: {screen: Tabs},
        Post: {screen: Post},
        Profile: {screen: Profile},
        Page: {screen: Page},
        Modal: {screen: Modals},
        LogOut: {
            path: '/logout',
            screen: LogoutScreen,
            navigationOptions: {
                drawerLabel: 'Logout',
            }
        },
    },
    {
        initialRouteName: 'Tabs',
        drawerPosition: 'right',
        contentOptions: {
            activeTintColor: Colors.primary,
            activeBackgroundColor: 'transparent',
            inactiveTintColor: '#ffffff',
            inactiveBackgroundColor: 'transparent',
            labelStyle: {
                fontSize: 15,
                marginLeft: 0,
            },
        },
        drawerWidth: SCREEN_WIDTH * 0.8,
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

export default Drawer;