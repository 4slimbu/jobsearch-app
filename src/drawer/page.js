import React from 'react';
import { createStackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import SinglePage from "../views/Page/PageDetail";

const LogoUrl = require('../../assets/icons/icon.png');

const PageView = ({ navigation }) => (
  <SinglePage navigation={navigation} />
);

const Page = createStackNavigator({
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
