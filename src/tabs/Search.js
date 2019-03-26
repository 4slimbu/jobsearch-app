import React from 'react';

import { StackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import SearchHome from '../views/search_home';
import SearchDetails from '../views/search_details';

const SearchTabView = ({ navigation }) => <SearchHome navigation={navigation} />;

const LogoUrl = require('../../assets/icons/icon.png');

const SearchDetailTabView = ({ navigation }) => (
  <SearchDetails
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
);

const SearchTab = StackNavigator({
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
  Search_Detail: {
    screen: SearchDetailTabView,
    path: '/search_detail',
    navigationOptions: {
      title: 'Search Detail',
    },
  },
});

export default SearchTab;
