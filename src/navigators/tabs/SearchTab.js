import React from 'react';

import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Icon, Image} from 'react-native-elements/src/index';

import Search from '../../screens/Search/SearchScreen';
import PostListScreen from "../../screens/Post/PostListScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";

const LogoUrl = require('../../../assets/icons/icon.png');

const SearchTab = createStackNavigator({
    Search: {
        screen: Search,
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
    PostList: {screen: PostListScreen},
    PostDetail: {screen: PostDetailScreen}
});

export default SearchTab;
