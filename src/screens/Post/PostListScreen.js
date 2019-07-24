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
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    {/*<View style={styles.headerContainer}>*/}
                        {/*<Text style={styles.heading}>Browsing {category.name}</Text>*/}
                    {/*</View>*/}
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <ListPicker
                            placeholderLabel="Select Category"
                            value={this.state.selectedCategoryId}
                            style={{height: 50, width: '100%'}}
                            onSelect={this.onSelectCategory}
                            items={this.props.categories}
                        />
                    </View>

                    {
                        !isReady ?
                            <ContentLoading/>
                            :
                            <PostList {...postListProps}/>
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
