import {Dimensions, Image, Text, View} from "react-native";
import colors from "../constants/colors";
import {DrawerItems, DrawerNavigator} from "react-navigation";
import React from "react";

import Components from "./components";
import Page from "./page";
import Logout from "../views/login/Logout";

const SCREEN_WIDTH = Dimensions.get('window').width;

const CustomDrawerContentComponent = props => (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
        <View
            style={{ marginTop: 40, marginBottom: 10, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
        >
            <Image
                source={require('./../images/logo.png')}
                style={{ width: SCREEN_WIDTH * 0.20, height: 50 }}
                resizeMode="contain"
            />
            <Text style={{fontSize: 18, fontWeight: 'bold', color: 'white'}}>Loksewa</Text>
        </View>
        <View style={{ marginLeft: 40 }}>
            <DrawerItems {...props} />
        </View>
    </View>
);

const Drawer = DrawerNavigator(
    {
        Home: {
            path: '/component',
            screen: Components,
            navigationOptions: {
                drawerLabel: 'Home',
            }
        },
        AboutUs: {
            path: '/about-us',
            screen: Page,
            navigationOptions: {
                drawerLabel: 'About Us',
            }
        },
        ContactUs: {
            path: '/contact-us',
            screen: Page,
            navigationOptions: {
                drawerLabel: 'Contact Us'
            }
        },
        Privacy: {
            path: '/privacy',
            screen: Page,
            navigationOptions: {
                drawerLabel: 'Privacy'
            }
        },
        TermsAndConditions: {
            path: '/terms-and-conditions',
            screen: Page,
            navigationOptions: {
                drawerLabel: 'Terms and Conditions'
            }
        },
        SecurityTips: {
            path: '/security-tips',
            screen: Page,
            navigationOptions: {
                drawerLabel: 'Security Tips',
            }
        },
        LogOut: {
            path: '/logout',
            screen: Logout,
            navigationOptions: {
                drawerLabel: 'Logout',
            }
        },
    },
    {
        initialRouteName: 'Home',
        drawerPosition: 'right',
        contentOptions: {
            activeTintColor: '#548ff7',
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