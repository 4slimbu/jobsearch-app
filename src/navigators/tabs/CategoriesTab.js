import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CategoriesScreen from "../../screens/Category/CategoriesScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PostListScreen from "../../screens/Post/PostListScreen";

const CategoriesTab = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        path: '/',
    },
    CategoryPostList: {
        screen: PostListScreen,
        path: '/post-list',
        params: { type: 'category' }
    },
    PostDetail: {
        screen: PostDetailScreen,
        path: '/post-detail',
    }
});

export default CategoriesTab;
