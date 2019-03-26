import React from 'react';
import { StackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import CategoriesHome from '../views/categories_home';
import CategoriesDetail from "../views/categories_detail";
import SinglePost from "../views/single_post";
import SinglePage from "../views/single_page";

const LogoUrl = require('../../assets/icons/icon.png');

const PageView = ({ navigation }) => (
  <SinglePage navigation={navigation} />
);

const Page = StackNavigator({
  Categories: {
    screen: PageView,
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
});

export default Page;
