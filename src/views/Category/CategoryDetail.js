import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {loadPostsByCategory} from "../../store/actions/category";
import * as _ from "lodash";
import PostList from "../../components/List/PostList";
import {authUpdatePreferences} from "../../store/actions/auth";

class CategoryDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: {},
            categoryPosts: [{}]
        };

        this.onSelectPost = this.onSelectPost.bind(this);
        this.onSavePost = this.onSavePost.bind(this);
    }

    componentWillReceiveProps() {
        this.setState({
            categoryPosts: this.props.postsByCategory
        });
    }

    async componentDidMount() {
        this._isMounted = true;

        const { params } = this.props.navigation.state;
        const categoryId = params ? params.categoryId : null;
        const category = _.find(this.props.categories, {id:categoryId});

        if (!categoryId) {
            alert('No category selected');
        }

        this._isMounted && await this.props.onLoadPostsByCategory(categoryId);

        this.setState({
            category: category
        });

    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectPost(postId) {
        console.log('on Select Post', postId);
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
        console.log('onSavePost', postId);
    }

    render() {
        const {category} = this.state;
        const {postsByCategory, preferences} = this.props;
        const postListProps = {
            posts: postsByCategory,
            onSelectPost: this.onSelectPost,
            onSavePost: this.onSavePost,
            savedPosts: preferences.savedPosts
        };
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{category.name}</Text>
                    </View>

                    <PostList {...postListProps}/>

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
        padding: 40,
        paddingLeft: 20,
        backgroundColor: '#4F80E1',
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
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

CategoryDetail.propTypes = {
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
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetail);
