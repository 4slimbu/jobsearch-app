import React from 'react';

import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import ManagePostsScreen from '../../screens/ManagePosts/ManagePostsScreen';
import AddPostScreen from "../../screens/ManagePosts/AddPostScreen";
import MyPostsScreen from "../../screens/ManagePosts/MyPostsScreen";
import MyCommentsScreen from "../../screens/ManagePosts/MyCommentsScreen";
import EditPostScreen from "../../screens/ManagePosts/EditPostScreen";
import SavedPostsScreen from "../../screens/ManagePosts/SavedPostsScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";

const LogoUrl = require('../../../assets/icons/icon.png');

const ManagePostsTab = createStackNavigator({
    Home: {
        screen: ManagePostsScreen,
        path: '/',
        navigationOptions: ({navigation}) => ({
            title: 'Loksewa',
            headerLeft: (
                <Image style={{marginLeft: 10, width: 40, height: 40}} source={LogoUrl}/>
            ),
            headerRight: (
                <Icon
                    name="menu"
                    size={30}
                    type="entypo"
                    containerStyle={{marginRight: 10}}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }),
    },
    AddPost: {screen: AddPostScreen},
    MyPosts: {screen: MyPostsScreen},
    MyComments: {screen: MyCommentsScreen},
    MySavedPosts: {screen: SavedPostsScreen},
    EditPost: {screen: EditPostScreen},
    PostList: {screen: PostListScreen},
    PostDetail: {screen: PostDetailScreen}
});

export default ManagePostsTab;
