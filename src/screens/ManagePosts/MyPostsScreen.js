import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getMyPosts} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";

class MyPostsScreen extends Component {
    constructor(props) {
        super(props);

        this.onSelectPost = this.onSelectPost.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.onGetMyPosts();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectPost(postId) {
        console.log('on Select Post', postId);
        this.props.navigation.navigate('PostDetail', {postId: postId});
    }

    render() {
        const {postsByMe} = this.props;
        const postListProps = {
            posts: postsByMe,
            onSelectPost: this.onSelectPost,
            type: 'my'
        };
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Posts</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            postsByMe && <PostList {...postListProps}/>
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
        postsByMe: state.posts.postsByMe
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMyPosts: () => dispatch(getMyPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsScreen);
