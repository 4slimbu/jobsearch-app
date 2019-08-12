import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import withCustomNav from "../../components/HOC/withCustomNav";

const SearchTab = createStackNavigator({
    Search: {
        screen: withCustomNav(PostListScreen),
        path: '/',
        params: { type: 'search', title: 'Search Posts', backBehavior: 'HOME' }
    },
    PostDetail: {screen: withCustomNav(PostDetailScreen)},
});

export default SearchTab;
