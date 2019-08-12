import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PageDetailScreen from "../../screens/Page/PageDetailScreen";
import withCustomNav from "../../components/HOC/withCustomNav";

const Page = createStackNavigator({
    AboutUs: {
        screen: withCustomNav(PageDetailScreen),
        path: '/about-us',
        params: {
            title: 'About Us'
        },
    },
    ContactUs: {
        screen: withCustomNav(PageDetailScreen),
        path: '/contact-us',
        params: {
            title: 'Contact Us'
        },
    },
    Privacy: {
        screen: withCustomNav(PageDetailScreen),
        path: '/privacy',
        params: {
            title: 'Privacy'
        },
    },
    TermsAndConditions: {
        screen: withCustomNav(PageDetailScreen),
        path: '/terms-and-conditions',
        params: {
            title: 'Terms and Conditions'
        },
    },
    SecurityTips: {
        screen: withCustomNav(PageDetailScreen),
        path: '/security-tips',
        params: {
            title: 'Security Tips'
        },
    }
});

export default Page;
