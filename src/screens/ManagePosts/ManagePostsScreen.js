import React, {Component} from 'react';
import {ListView, ScrollView, StyleSheet, View} from 'react-native';

import {ListItem,} from 'react-native-elements/src/index';

import Colors from '../../constants/colors';
import {FontAwesome} from "@expo/vector-icons";

const managePostList = [
    {
        name: 'New Post',
        icon: 'plus-circle',
        target: 'AddPost',
    },
    {
        name: 'My Posts',
        icon: 'file-text-o',
        target: 'MyPosts',
    },
    {
        name: 'My Activities',
        icon: 'comments-o',
        target: 'MyActivities',
    },
    {
        name: 'My Saved Posts',
        icon: 'star-o',
        target: 'MySavedPosts',
    },
];

class ManagePostsScreen extends Component {
    constructor() {
        super();
        this.updateIndex = this.updateIndex.bind(this);
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.list}>
                    {managePostList.map((l, i) => (
                        <ListItem
                            leftIcon={<FontAwesome name={l.icon} size={25} color={Colors.darkGray}/>}
                            key={i}
                            onPress={() => this.props.navigation.navigate(l.target)}
                            title={l.name}
                            subtitle={l.subtitle}
                            titleStyle={{color: Colors.darkGray,}}
                            chevron
                            bottomDivider
                        />
                    ))}
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        // marginTop: 20,
        // borderTopWidth: 1,
        // borderColor: colors.greyOutline,
        // backgroundColor: '#fff',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#acacac',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
    },
    fonts: {
        marginBottom: 8,
    },
    user: {
        flexDirection: 'row',
        marginBottom: 6,
    },
    image: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        marginTop: 5,
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subtitleView: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingTop: 5,
    },
    ratingImage: {
        height: 19.21,
        width: 100,
    },
    ratingText: {
        paddingLeft: 10,
        color: 'grey',
    },
});

export default ManagePostsScreen;
