import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CategoriesScreen from "../../screens/Category/CategoriesScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";

const CategoriesTab = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        path: '/',
    },
    PostList: {
        screen: PostListScreen,
        path: '/post-list',
    },
    PostDetail: {
        screen: PostDetailScreen,
        path: '/post-detail',
    }
});

export default CategoriesTab;
