import React from 'react';
import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Icon, Image} from 'react-native-elements/src/index';
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import PostListScreen from "../../screens/Post/PostListScreen";
import PageDetailScreen from "../../screens/Page/PageDetailScreen";

const LogoUrl = require('../../../assets/icons/icon.png');

const Stacks = createStackNavigator({
    PostList: {
        screen: PostListScreen,
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
    PostDetail: {
        screen: PostDetailScreen,
        path: '/post-detail',
        navigationOptions: {
            title: 'Post Detail',
        },
    },
    PageDetail: {
        screen: PageDetailScreen,
        path: '/page-detail',
        navigationOptions: {
            title: 'Page Detail',
        },
    },
});

export default Stacks;
