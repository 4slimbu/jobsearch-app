import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import CategoriesTab from '../tabs/categories';
import ManagePostsTab from '../tabs/manage_posts';
import SearchTab from '../tabs/Search';
import Colors from "../constants/colors";

const Components = createBottomTabNavigator(
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
                tabBarLabel: 'ManagePosts',
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

// Workaround to avoid crashing when you come back on Components screen
// and you were not on the Buttons tab
export default createStackNavigator(
    {
        ComponentsTabs: {screen: Components},
    },
    {
        headerMode: 'none',
    }
);
