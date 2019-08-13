import React from 'react';
import {createStackNavigator} from 'react-navigation';

import ManagePostsScreen from '../../screens/ManagePosts/ManagePostsScreen';
import AddPostScreen from "../../screens/ManagePosts/AddPostScreen";
import MyCommentsScreen from "../../screens/ManagePosts/MyCommentsScreen";
import EditPostScreen from "../../screens/ManagePosts/EditPostScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import withCustomNav from "../../components/HOC/withCustomNav";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";

const ManagePostsTab = createStackNavigator({
    ManagePosts: {
        screen: withCustomNav(ManagePostsScreen),
        path: '/manage-posts',
        params: { title: 'Manage Posts', backBehavior: 'HOME'}
    },
    AddPost: {screen: withCustomNav(AddPostScreen), params: { title: 'Add Post'}},
    MyPosts: {screen: withCustomNav(PostListScreen), params: {type: 'my', title: 'My Posts'}},
    MyActivities: {screen: withCustomNav(MyCommentsScreen), params: { title: 'My Activities'}},
    MySavedPosts: {screen: withCustomNav(PostListScreen), params: {type: 'saved', title: 'My Saved Posts'}},
    EditPost: {screen: withCustomNav(EditPostScreen), params: { title: 'Edit Post'}},
    PostDetail: {screen: withCustomNav(PostDetailScreen), params: { title: ''}},
});

export default ManagePostsTab;
