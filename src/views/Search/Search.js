import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon, SearchBar,} from 'react-native-elements/src/index';

import Colors from "../../constants/colors";
import {connect} from "react-redux";
import {searchPosts} from "../../store/actions/post";
import PostList from "../../components/List/PostList";
import {authUpdatePreferences} from "../../store/actions/auth";

const SCREEN_WIDTH = Dimensions.get('window').width;

// on change text
// call searchHandler
// which will call onSearch action
// which will call post search api
// the returned data will be stored on posts:search
// on scroll show more post list

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            searchText: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectPost = this.onSelectPost.bind(this);
        this.onSavePost = this.onSavePost.bind(this);
    }

    onChange(searchText) {
        this.setState({
            ...this.state,
            searchText: searchText
        });

        // Check if state is loading, then do nothing
        if (!this.state.isLoading) {
            // Call action only after few milli seconds
            setTimeout(() => {
                // Initiate loading
                this.setState({
                    ...this.state,
                    isLoading: true
                });

               this.props.onSearch(this.state.searchText);

                // Stop Loading
                this.setState({
                    ...this.state,
                    isLoading: false
                });
            }, 500);
        }
    }

    onSelectPost(postId) {
        console.log('on Select Post', postId);
        this.props.navigation.navigate('SearchedPostDetail', {postId: postId});
    }

    onSavePost(postId) {
        let savedPosts = [...this.props.preferences.savedPosts];
        let index = savedPosts.indexOf(postId);
        if (index > -1) {
            savedPosts.splice(index, 1);
        } else {
            savedPosts.push(postId);
        }
        let preferences = {
            ...this.props.preferences,
            savedPosts: savedPosts
        };
        this.props.onUpdatePreferences(preferences);
        console.log('onSavePost', postId);
    }

    render() {
        const {searchText} = this.state;
        const {searchedPosts, preferences} = this.props;
        const postListProps = {
            posts: searchedPosts,
            onSelectPost: this.onSelectPost,
            onSavePost: this.onSavePost,
            savedPosts: preferences.savedPosts
        };
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
                <View style={styles.headerContainer}>
                    <Icon color="white" name="search" size={62}/>
                    <Text style={styles.heading}>Search Posts</Text>
                </View>
                <SearchBar lightTheme placeholder="Search Posts"
                    showLoading={this.state.isLoading}
                    value={searchText}
                    onChangeText={searchText => this.onChange(searchText)}
                />

                <View style={{marginTop: 20}}>
                    {
                        searchedPosts && <PostList {...postListProps}/>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#B46486',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangleLeft: {
        position: 'absolute',
        left: -20,
        bottom: 0,
        width: 0,
        height: 0,
        borderRightWidth: 20,
        borderRightColor: 'white',
        borderBottomWidth: 25,
        borderBottomColor: 'transparent',
        borderTopWidth: 25,
        borderTopColor: 'transparent',
    },
    triangleRight: {
        position: 'absolute',
        right: -20,
        top: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderLeftColor: 'white',
        borderBottomWidth: 25,
        borderBottomColor: 'transparent',
        borderTopWidth: 25,
        borderTopColor: 'transparent',
    },
    inputContainerStyle: {
        marginTop: 16,
        width: '90%',
    },
    searchBar: {
        backgroundColor: Colors.grey5
    }
});

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        searchedPosts: state.posts.searchedPosts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        onSearch: (text) => dispatch(searchPosts(text))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
