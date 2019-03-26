import React from 'react';
import { StackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import CategoriesHome from '../views/categories_home';
import CategoriesDetail from "../views/categories_detail";
import SinglePost from "../views/single_post";

const LogoUrl = require('../../assets/icons/icon.png');

const CategoriesTabView = ({ navigation }) => (
  <CategoriesHome navigation={navigation} />
);

const CategoriesDetailTabView = ({ navigation }) => (
    <CategoriesDetail
        navigation={navigation}
    />
);

const CategoriesTab = StackNavigator({
  Categories: {
    screen: CategoriesTabView,
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
  CategoriesDetail: {
    screen: CategoriesDetailTabView,
    path: '/categories-detail',
    navigationOptions: {
      title: 'Categories Detail',
    },
  },
  SinglePost: {
    screen: SinglePost,
    path: '/single-post',
    navigationOptions: {
      title: 'Single Post',
    },
  },
});

export default CategoriesTab;
