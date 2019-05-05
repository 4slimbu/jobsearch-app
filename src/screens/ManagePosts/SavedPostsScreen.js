import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getSavedPosts} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";

class SavedPostsScreen extends Component {
    constructor(props) {
        super(props);

        this.onSelectPost = this.onSelectPost.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.onGetSavedPosts();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectPost(postId) {
        console.log('on Select Post', postId);
        this.props.navigation.navigate('PostDetail', {postId: postId});
    }

    render() {
        const {savedPosts} = this.props;
        const postListProps = {
            posts: savedPosts,
            onSelectPost: this.onSelectPost,
            type: 'saved'
        };
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Saved Posts</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            savedPosts && <PostList {...postListProps}/>
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
        justifyContent: 'center',
        padding: 40,
        paddingLeft: 20,
        backgroundColor: Colors.primary1,
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
    postTitle: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

const mapStateToProps = state => {
    return {
        savedPosts: state.posts.savedPosts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetSavedPosts: () => dispatch(getSavedPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SavedPostsScreen);

