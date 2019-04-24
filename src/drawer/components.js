import React from 'react';
import {StackNavigator, TabNavigator} from 'react-navigation';
import {Icon} from 'react-native-elements';

import CategoriesTab from '../tabs/categories';
import ManagePostsTab from '../tabs/manage_posts';
import SearchTab from '../tabs/Search';
import Colors from "../constants/colors";

const Components = TabNavigator(
  {
    CategoriesTab: {
      screen: CategoriesTab,
      path: '/categories',
      navigationOptions: {
        tabBarLabel: 'Categories',
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon
            name= "code-fork"
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
        tabBarIcon: ({ tintColor, focused }) => (
          <Icon name="list" size={30} type="entypo" color={tintColor} />
        ),
      },
    },
    SearchTab: {
      screen: SearchTab,
      path: '/search',
      navigationOptions: {
        tabBarLabel: 'Search',
        tabBarIcon: ({ tintColor, focused }) => (
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
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: Colors.grey5,
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
  }
);

// Workaround to avoid crashing when you come back on Components screen
// and you were not on the Buttons tab
export default StackNavigator(
  {
    ComponentsTabs: { screen: Components },
  },
  {
    headerMode: 'none',
  }
);
