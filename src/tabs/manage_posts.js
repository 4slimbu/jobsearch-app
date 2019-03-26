import React from 'react';

import { StackNavigator } from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import ManagePostsHome from '../views/manage_posts_home';
import ManagePostsDetails from '../views/manage_posts';
import AddPost from "../views/add_post";
import MyPosts from "../views/my_posts";
import MyComments from "../views/my_comments";
import CategoriesDetail from "../views/categories_detail";
import MyProfile from "../views/my_profile";
import EditPost from "../views/edit_post";

const LogoUrl = require('../../assets/icons/icon.png');

const ManagePostsTabView = ({ navigation }) => (
  <ManagePostsHome banner="ManagePosts" navigation={navigation} />
);

const ManagePostsDetailTabView = ({ navigation }) => (
  <ManagePostsDetails banner="Manage Posts Detail" navigation={navigation} />
);

const ManagePostsTab = StackNavigator({
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
    screen: CategoriesDetail
  },
  MyProfile: {
    screen: MyProfile
  },
  EditPost: {
    screen: EditPost
  }
});

export default ManagePostsTab;
