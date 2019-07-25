import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {loadPostsByCategory} from "../../store/actions/categoryActions";
import * as _ from "lodash";
import PostList from "../../components/List/PostList";
import {authUpdatePreferences} from "../../store/actions/authActions";
import alertMessage from "../../components/Alert";
import ContentLoading from "../../components/ContentLoading";
import Colors from '../../constants/colors';
import {setPostsByCategory} from "../../store/actions/postActions";
import ListPicker from "../../components/Picker/ListPicker";
import appData from "../../constants/app";
import PostListMetaData from "../../components/PostListMetaData";

class PostListScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            categoryPosts: [{}],
            selectedCategoryId: null,
            isLoading: false,
            isReady: false,
        };

        this.onSelectPost = this.onSelectPost.bind(this);
        this.onSavePost = this.onSavePost.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        const { params } = this.props.navigation.state;
        const categoryId = params ? params.categoryId : null;
        const category = _.find(this.props.categories, {id:categoryId});

        if (!categoryId) {
            alertMessage({title: "Error", body: "No category selected"});
        }

        this._isMounted && await this.props.onLoadPostsByCategory(categoryId);

        this.setState({
            category: category,
            selectedCategoryId: categoryId,
            isReady: true
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
        this.props.setPostsByCategory({
            data: [],
            links: {},
            meta: {}
        });
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

    async onSelectCategory(categoryId) {
        this.setState({selectedCategoryId: categoryId});
        this._isMounted && await this.props.onLoadPostsByCategory(categoryId);
    }

    async scrollHandler(e){
        if (this.state.searchText.length < 3) {
            return;
        }

        let windowHeight = appData.app.SCREEN_HEIGHT,
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
        const {category, isReady} = this.state;
        const {postsByCategory, preferences} = this.props;
        const postListProps = {
            posts: postsByCategory,
            onSelectPost: this.onSelectPost,
            onSavePost: this.onSavePost,
            savedPosts: preferences.savedPosts,
        };
        return (
            <ScrollView style={styles.container} keyboardShouldPersistTaps="handled" onScrollEndDrag={this.scrollHandler}>
                <View style={styles.contentView}>
                    {/*<View style={{marginLeft: 20, marginRight: 20}}>*/}
                        {/*<ListPicker*/}
                            {/*placeholderLabel="Select Category"*/}
                            {/*value={this.state.selectedCategoryId}*/}
                            {/*style={{height: 50, width: '100%'}}*/}
                            {/*onSelect={this.onSelectCategory}*/}
                            {/*items={this.props.categories}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    <PostListMetaData meta={postsByCategory.meta}/>
                    <PostList {...postListProps}/>

                    <View style={{height: 100}}>
                        {
                            !isReady ? <ContentLoading/> :
                                <PostListMetaData meta={postsByCategory.meta}/>

                        }
                    </View>

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
        padding: 10,
        backgroundColor: Colors.lightGray,
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    heading: {
        color: Colors.darkGray,
        fontSize: 14,
        fontWeight: 'normal',
    },
});

PostListScreen.propTypes = {
    preferences: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    postsByCategory: PropTypes.object.isRequired,
    onLoadPostsByCategory: PropTypes.func.isRequired,
    onUpdatePreferences: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        categories: state.categories,
        postsByCategory: state.posts.postsByCategory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadPostsByCategory: (categoryId) => dispatch(loadPostsByCategory(categoryId)),
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        setPostsByCategory: (data) => dispatch(setPostsByCategory(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostListScreen);
