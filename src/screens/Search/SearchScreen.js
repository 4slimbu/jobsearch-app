import React, {Component} from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {Icon, SearchBar,} from 'react-native-elements';

import Colors from "../../constants/colors";
import {connect} from "react-redux";
import {resetSearchedPosts, searchPosts} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";
import {authUpdatePreferences} from "../../store/actions/authActions";
import ContentLoading from "../../components/ContentLoading";

const SCREEN_WIDTH = Dimensions.get('window').width;

// on change text
// call searchHandler
// which will call onSearch action
// which will call post search api
// the returned data will be stored on postsReducers:search
// on scroll show more post list

class SearchScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            searchText: ""
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectPost = this.onSelectPost.bind(this);
        this.onSavePost = this.onSavePost.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    onChange(searchText) {
        this.setState({searchText});

        if (searchText.length === 0) {
            this.props.resetSearchedPosts();
        }

        if (searchText.length < 3) {
            return;
        }

        // Check if state is loading, then do nothing
        if (!this.state.isLoading) {
            // Initiate loading
            this.setState({ isLoading: true });

            // Call action only after few milli seconds
            setTimeout(() => {
               this.props.onSearch(this.state.searchText);

                // Stop Loading
                this.setState({ isLoading: false });
            }, 500);
        }
    }

    onSelectPost(postId) {
        this.props.navigation.navigate('PostDetail', {postId: postId});
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
    }

    async scrollHandler(e){
        if (this.state.searchText.length < 3) {
            return;
        }

        let windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if( windowHeight + offset >= height ){
            if (this.props.searchedPosts.meta.to !== this.props.searchedPosts.meta.total) {
                this.setState({isLoading: true});
                await this.props.onSearch(this.state.searchText, this.props.searchedPosts.links.next).then(res => {
                    this.setState({isLoading: false});
                }).catch(err => {
                    this.setState({isLoading: false});
                });
            }
        }
    }

    render() {
        const {searchText, isLoading} = this.state;
        const {searchedPosts} = this.props;
        const postListProps = {
            type: "search",
            posts: searchedPosts,
        };
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" onScrollEndDrag={this.scrollHandler}>
                {/*<View style={styles.headerContainer}>*/}
                    {/*<Icon color="white" name="search" size={62}/>*/}
                    {/*<Text style={styles.heading}>Search Posts</Text>*/}
                {/*</View>*/}
                <SearchBar lightTheme placeholder="Search Posts"
                    showLoading={isLoading}
                    value={searchText}
                    onChangeText={searchText => this.onChange(searchText)}
                />

                <View style={{marginTop: 20}}>
                     <PostList {...postListProps}/>
                </View>

                <View style={{height: 100}}>
                    {
                        isLoading && <ContentLoading/>
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
        backgroundColor: '#acacac',
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
        onSearch: (text, url) => dispatch(searchPosts(text, url)),
        resetSearchedPosts: () => dispatch(resetSearchedPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);
