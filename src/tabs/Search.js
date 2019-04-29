import React from 'react';

import { createStackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import Search from '../views/Search/Search';
import PostDetail from "../views/Post/PostDetail";

const SearchTabView = ({ navigation }) => <Search navigation={navigation} />;

const LogoUrl = require('../../assets/icons/icon.png');

const SearchedPostDetailTabView = ({ navigation }) => (
  <PostDetail
    navigation={navigation}
  />
);

const SearchTab = createStackNavigator({
  Search: {
    screen: SearchTabView,
    path: '/',
    navigationOptions: ({ navigation }) => ({
      title: 'Loksewa',
      headerLeft: (
          <Image style={{ marginLeft: 10, width: 40, height: 40  }} source={LogoUrl} />
      ),
      headerRight: (
          <Icon
              name="menu"
              size={30}
              type="entypo"
              containerStyle={{ marginRight: 10 }}
              onPress={() => navigation.navigate('DrawerOpen')}
          />
      ),
    }),
  },
  SearchedPostDetail: {
    screen: SearchedPostDetailTabView,
    path: '/searched_post_detail',
    navigationOptions: {
      title: 'Post Detail',
    },
  },
});

export default SearchTab;
