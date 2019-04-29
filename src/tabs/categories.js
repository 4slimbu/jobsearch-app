import React from 'react';
import {createStackNavigator} from 'react-navigation';
import {Icon, Image} from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import { SafeAreaView } from 'react-navigation';
import CategoriesHome from '../views/Category/Categories';
import CategoryDetail from "../views/Category/CategoryDetail";
import PostDetail from "../views/Post/PostDetail";

const LogoUrl = require('../../assets/icons/icon.png');

const CategoriesTabView = ({navigation}) => (
    <SafeAreaView>
        <CategoriesHome navigation={navigation}/>
    </SafeAreaView>
);

const CategoryDetailTabView = ({navigation}) => (
    <CategoryDetail
        navigation={navigation}
    />
);

const CategoriesTab = createStackNavigator({
    Categories: {
        screen: CategoriesTabView,
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
    CategoryDetail: {
        screen: CategoryDetailTabView,
        path: '/categories-detail',
        navigationOptions: {
            title: 'Categories Detail',
        },
    },
    PostDetail: {
        screen: PostDetail,
        path: '/post-detail',
        navigationOptions: {
            title: 'Post Detail',
        },
    },
});

export default CategoriesTab;
