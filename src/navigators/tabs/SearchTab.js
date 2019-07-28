import React from 'react';

import {createStackNavigator, DrawerActions} from 'react-navigation';
import {Image} from 'react-native-elements';

import PostDetailScreen from "../../screens/Post/PostDetailScreen";
import {Feather} from "@expo/vector-icons";
import appData from "../../constants/app";
import Colors from "../../constants/colors";
import PostListScreen from "../../screens/Post/PostListScreen";

const SearchTab = createStackNavigator({
    Search: {
        screen: PostListScreen,
        path: '/',
        params: { type: 'search' },
        navigationOptions: ({navigation}) => ({
            title: 'Search',
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
    PostDetail: {screen: PostDetailScreen},
});

export default SearchTab;
