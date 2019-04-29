import React from 'react';

import { createStackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import ManagePostsHome from '../views/ManagePosts/manage_posts_home';
import ManagePostsDetails from '../views/ManagePosts/manage_posts';
import AddPost from "../views/ManagePosts/AddPost";
import MyPosts from "../views/ManagePosts/MyPosts";
import MyComments from "../views/ManagePosts/MyComments";
import CategoriesDetail from "../views/Category/CategoryDetail";
import MyProfile from "../views/ManagePosts/MyProfile";
import EditPost from "../views/ManagePosts/edit_post";
import SavedPosts from "../views/ManagePosts/SavedPosts";

const LogoUrl = require('../../assets/icons/icon.png');

const ManagePostsTabView = ({ navigation }) => (
  <ManagePostsHome banner="ManagePosts" navigation={navigation} />
);

const ManagePostsDetailTabView = ({ navigation }) => (
  <ManagePostsDetails banner="Manage Posts Detail" navigation={navigation} />
);

const ManagePostsTab = createStackNavigator({
  Home: {
    screen: ManagePostsTabView,
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
  ManagePostsDetail: {
    screen: ManagePostsDetailTabView,
    path: 'manage-post-detail',
    navigationOptions: {
      title: 'Manage Posts Detail',
    },
  },
  AddPost: {
    screen: AddPost
  },
  MyPosts: {
    screen: MyPosts
  },
  MyComments: {
    screen: MyComments
  },
  MySavedPosts: {
    screen: SavedPosts
  },
  MyProfile: {
    screen: MyProfile
  },
  EditPost: {
    screen: EditPost
  }
});

export default ManagePostsTab;
