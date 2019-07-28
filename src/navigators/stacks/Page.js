import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PageDetailScreen from "../../screens/Page/PageDetailScreen";

const Page = createStackNavigator({
    AboutUs: {
        screen: PageDetailScreen,
        path: '/about-us',
        params: {
            title: 'About Us'
        },
    },
    ContactUs: {
        screen: PageDetailScreen,
        path: '/contact-us',
        params: {
            title: 'Contact Us'
        },
    },
    Privacy: {
        screen: PageDetailScreen,
        path: '/privacy',
        params: {
            title: 'Privacy'
        },
    },
    TermsAndConditions: {
        screen: PageDetailScreen,
        path: '/terms-and-conditions',
        params: {
            title: 'Terms and Conditions'
        },
    },
    SecurityTips: {
        screen: PageDetailScreen,
        path: '/security-tips',
        params: {
            title: 'Security Tips'
        },
    }
});

export default Page;
