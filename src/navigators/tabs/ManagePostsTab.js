import React from 'react';
import appData from "../../constants/app";

import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Image} from 'react-native-elements';
import {Feather} from '@expo/vector-icons';
import Colors from '../../constants/colors';

import ManagePostsScreen from '../../screens/ManagePosts/ManagePostsScreen';
import AddPostScreen from "../../screens/ManagePosts/AddPostScreen";
import MyCommentsScreen from "../../screens/ManagePosts/MyCommentsScreen";
import EditPostScreen from "../../screens/ManagePosts/EditPostScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PostListScreen from "../../screens/Post/PostListScreen";

const ManagePostsTab = createStackNavigator({
    ManagePosts: {
        screen: ManagePostsScreen,
        path: '/',
        navigationOptions: ({navigation}) => ({
            title: 'Manage Posts',
            headerLeft: (
                <Image style={{marginLeft: 10, width: 40, height: 40}} source={appData.app.LOGO_INNER_URL}/>
            ),
            headerRight: (
                <Feather
                    name="bar-chart-2"
                    style={{marginRight: 10, transform: [{ rotate: "-90deg" }]}}
                    size={32}
                    color={Colors.darkGray}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }),
    },
    AddPost: {screen: AddPostScreen, navigationOptions: ({navigation}) => ({ title: 'Add Post'})},
    MyPosts: {screen: PostListScreen, params: {type: 'my'}, navigationOptions: ({navigation}) => ({ title: 'My Posts'})},
    MyComments: {screen: MyCommentsScreen, navigationOptions: ({navigation}) => ({ title: 'My Activities'})},
    MySavedPosts: {screen: PostListScreen, params: {type: 'saved'}, navigationOptions: ({navigation}) => ({ title: 'My Saved Posts'})},
    EditPost: {screen: EditPostScreen, navigationOptions: ({navigation}) => ({ title: 'Edit Post'})},
    ManagePostList: {screen: PostListScreen},
    PostDetail: {screen: PostDetailScreen}
});

export default ManagePostsTab;
