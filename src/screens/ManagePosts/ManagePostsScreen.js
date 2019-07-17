import React, {Component} from 'react';
import {ListView, ScrollView, StyleSheet, View} from 'react-native';

import {ListItem, Text,} from 'react-native-elements/src/index';
import Icon from 'react-native-vector-icons/FontAwesome';

import Colors from '../../constants/colors';

const log = () => {
};

const managePostList = [
    {
        name: 'New Post',
        icon: 'plus-circle',
        target: 'AddPost',
        type: 'font-awesome',
    },
    {
        name: 'My Posts',
        icon: 'file-text-o',
        target: 'MyPosts',
        type: 'font-awesome',
    },
    {
        name: 'My Comments',
        icon: 'comments-o',
        target: 'MyComments',
        type: 'font-awesome',
    },
    {
        name: 'My Saved Posts',
        icon: 'star-o',
        target: 'MySavedPosts',
        type: 'font-awesome',
    },
];

class ManagePostsScreen extends Component {
    constructor() {
        super();
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });

        this.updateIndex = this.updateIndex.bind(this);
        this.renderRow = this.renderRow.bind(this);
    }

    updateIndex(selectedIndex) {
        this.setState({selectedIndex});
    }

    renderRow(rowData, sectionID) {
        return (
            <ListItem
                key={sectionID}
                onPress={log}
                title={rowData.title}
                leftIcon={{name: rowData.icon}}
                chevron
                bottomDivider
            />
        );
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.list}>
                    {managePostList.map((l, i) => (
                        <ListItem
                            leftIcon={{
                                name: l.icon,
                                type: l.type,
                                size: 25,
                                color: Colors.mediumGray,
                            }}
                            key={i}
                            onPress={() => this.props.navigation.navigate(l.target)}
                            title={l.name}
                            subtitle={l.subtitle}
                            titleStyle={{ color: Colors.darkGray,}}
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
