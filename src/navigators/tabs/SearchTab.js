import React from 'react';

import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Icon, Image} from 'react-native-elements';

import Search from '../../screens/Search/SearchScreen';
import PostListScreen from "../../screens/Post/PostListScreen";
import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import Feather from "@expo/vector-icons";
import appData from "../../constants/app";
import Colors from "../../constants/colors";

const LogoUrl = require('../../../assets/icons/icon.png');

const SearchTab = createStackNavigator({
    Search: {
        screen: Search,
        path: '/',
        navigationOptions: ({navigation}) => ({
            title: 'Loksewa',
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
    PostList: {screen: PostListScreen},
    PostDetail: {screen: PostDetailScreen}
});

export default SearchTab;
