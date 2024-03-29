import {Image, Text, TouchableOpacity, View} from "react-native";
import appData from "../../constants/app";
import {createDrawerNavigator} from "react-navigation";
import React from "react";
import LogoutScreen from "../../screens/Auth/LogoutScreen";
import Tabs from "../tabs/Tabs";
import Modals from "../modals/Modals";
import {ListItem} from "react-native-elements";
import Colors from "../../constants/colors";
import Profile from "../stacks/Profile";
import Page from "../stacks/Page";

const menuList = [
    {
        name: 'My Profile',
        icon: 'verified-user',
        target: 'MyProfile'
    },
    {
        name: 'About Us',
        icon: 'assistant',
        target: 'AboutUs'
    },
    {
        name: 'Contact Us',
        icon: 'mail',
        target: 'ContactUs'
    },
    {
        name: 'Privacy',
        icon: 'fingerprint',
        target: 'Privacy'
    },
    {
        name: 'Terms And Conditions',
        icon: 'lightbulb-outline',
        target: 'TermsAndConditions'
    },
    {
        name: 'Security Tips',
        icon: 'track-changes',
        target: 'SecurityTips'
    },
    {
        name: 'Logout',
        icon: 'logout',
        type: 'simple-line-icon',
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
        >
            <TouchableOpacity onPress={() => props.navigation.navigate(appData.routes.HOME)}>
                <Image
                    source={appData.app.LOGO_INNER_URL}
                    style={{width: appData.app.SCREEN_WIDTH * 0.20, height: 50}}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.darkGray}}>MENU</Text>
        </View>
        <View>
            {menuList.map((l, i) => (
                <ListItem
                    leftIcon={{
                        name: l.icon,
                        type: l.type,
                        size: 25,
                        color: Colors.darkGray,
                    }}
                    titleStyle={{ color: Colors.darkGray,}}
                    key={i}
                    onPress={() => props.navigation.navigate(l.target, {navTarget: l.target})}
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
        swipeEnabled: true,
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
        drawerWidth: appData.app.SCREEN_WIDTH * 0.8,
        edgeWidth: 50 - appData.app.SCREEN_WIDTH,
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: 'DrawerOpen',
        drawerCloseRoute: 'DrawerClose',
        drawerToggleRoute: 'DrawerToggle',
    }
);

export default Drawer;