import React from 'react';
import {createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements/src/index';

import CategoriesTab from './CategoriesTab';
import ManagePostsTab from './ManagePostsTab';
import SearchTab from './SearchTab';
import Colors from "../../constants/colors";

const Tabs = createBottomTabNavigator(
    {
        CategoriesTab: {
            screen: CategoriesTab,
            path: '/categories',
            navigationOptions: {
                tabBarLabel: 'Categories',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name="code-fork"
                        size={30}
                        type="font-awesome"
                        color={tintColor}
                    />
                ),
            },
        },
        ManagePostsTab: {
            screen: ManagePostsTab,
            path: '/manage-posts',
            navigationOptions: {
                tabBarLabel: 'Manage Posts',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon name="list" size={30} type="entypo" color={tintColor}/>
                ),
            },
        },
        SearchTab: {
            screen: SearchTab,
            path: '/search',
            navigationOptions: {
                tabBarLabel: 'Search',
                tabBarIcon: ({tintColor, focused}) => (
                    <Icon
                        name="search"
                        size={30}
                        type="font-awesome"
                        color={tintColor}
                    />
                ),
            },
        },
    },
    {
        initialRouteName: 'CategoriesTab',
        animationEnabled: false,
        swipeEnabled: false,
        // Android's default option displays tabBars on top, but iOS is bottom
        tabBarPosition: 'bottom',
        tabBarOptions: {
            activeTintColor: Colors.primary1,
            // Android's default showing of icons is false whereas iOS is true
            showIcon: true,
            style: {
                paddingTop: 10,
                paddingBottom: 10,
                height: 70,
            }
        },
    }
);
export default Tabs;