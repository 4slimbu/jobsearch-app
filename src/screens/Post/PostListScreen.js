import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {SearchBar,} from 'react-native-elements';

import Colors from "../../constants/colors";
import {connect} from "react-redux";
import {getPosts, resetPostFilter, resetPosts, updatePostFilter} from "../../store/actions/postActions";
import {authUpdatePreferences} from "../../store/actions/authActions";
import {uiUpdateViewHistory} from "../../store/actions/uiActions";
import * as _ from "lodash";
import PostList from "../../components/List/PostList";

class PostListScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady: false,
            isLoading: false,
            searchText: "",
            setTimeoutId: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectPost = this.onSelectPost.bind(this);
        this.onSavePost = this.onSavePost.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    async componentDidMount() {
        this.props.resetPosts();

        const { params } = this.props.navigation.state;
        let baseFilter = {
            type: "",
            search: "",
            category: [],
        };
        if (params.type === 'my' || params.type === 'saved'){ baseFilter.radius = "" }
        if (params.type === 'my' || params.type === 'saved'){ baseFilter.orderBy = "latest" }

        await this.props.updatePostFilter({...baseFilter, ...params});

        // Don't automatically pull posts for search
        if (this.props.posts.filter.type === 'search') {
            this.setState({isReady: true});
        } else {
            await this.props.getPosts(this.props.posts.filter) && this.setState({isReady: true});
        }

    }

    refresh() {
        this.setState({isReady: false});
        this.props.getPosts(this.props.posts.filter) && this.setState({isReady: true});
    }

    onChange(searchText) {
        this.setState({searchText});
        this.props.updatePostFilter({search: searchText});

        if (searchText.length === 0) {
            this.props.resetPosts();
        }

        if (searchText.length < 3) {
            return;
        }

        clearTimeout(this.state.setTimeoutId);
        // Initiate loading
        this.setState({ isLoading: true });
        // Call action only after few milli seconds
        let setTimeoutId = setTimeout(() => {
            this.props.getPosts(this.props.posts.filter);

            // Stop Loading
            this.setState({ isLoading: false });
        }, 300);

        this.setState({setTimeoutId: setTimeoutId});
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
        this.refresh();
    }

    async scrollHandler(){
        if (this.props.posts.posts.meta.to !== this.props.posts.posts.meta.total) {
            await this.props.getPosts(this.props.posts.filter, this.props.posts.posts.links.next);
        }
    }

    render() {
        const {searchText, isReady, isLoading} = this.state;
        const {posts, filter} = this.props.posts;
        const postListProps = {
            type: filter.type,
            posts: posts,
            backScreen: this.props.viewHistory[this.props.viewHistory.length - 1],
            isFilterActive: ! _.isEqual(filter, {
                type: "",
                search: "",
                category: [],
                radius: 100,
                orderBy: "nearest",
            }),
            onRefresh: this.refresh,
            filter: filter,
            onScroll: this.scrollHandler
        };

        return (
            <View style={styles.container} keyboardShouldPersistTaps="handled" >
                <SearchBar
                    lightTheme
                    containerStyle={{backgroundColor: Colors.white, borderWidth: 0}}
                    inputContainerStyle={{backgroundColor: Colors.white, borderWidth: 0, marginTop: 0}}
                    placeholder="Type here to search.."
                    showLoading={isLoading}
                    value={searchText}
                    onChangeText={searchText => this.onChange(searchText)}
                />

                <PostList {...postListProps}/>
            </View>
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
    },

});

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        posts: state.posts,
        viewHistory: state.ui.viewHistory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        uiUpdateViewHistory: (navData) => dispatch(uiUpdateViewHistory(navData)),
        updatePostFilter: (filterData) => dispatch(updatePostFilter(filterData)),
        getPosts: (queryObject, url) => dispatch(getPosts(queryObject, url)),
        resetPosts: () => dispatch(resetPosts()),
        resetPostFilter: () => dispatch(resetPostFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListScreen);
