import React from 'react';
import {createStackNavigator} from 'react-navigation';
import CategoriesScreen from "../../screens/Category/CategoriesScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import withCustomNav from "../../components/HOC/withCustomNav";

const CategoriesTab = createStackNavigator({
    Categories: {
        screen: withCustomNav(CategoriesScreen),
        path: '/',
        params: { title: 'Browse Categories', backBehavior: 'HOME'}
    },
    CategoryPostList: {
        screen: withCustomNav(PostListScreen),
        path: '/post-list',
        params: { title: '', type: 'category'}
    },
    PostDetail: {
        screen: withCustomNav(PostDetailScreen),
        path: '/post-detail',
        params: { title: 'Post Detail'}
    }
});

export default CategoriesTab;
