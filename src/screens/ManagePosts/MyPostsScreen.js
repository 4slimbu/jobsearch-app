import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getMyPosts} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";

class MyPostsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // loaded, loading, failed, no-posts
            getPostsStatus: 'loading',
        };

        this.onSelectPost = this.onSelectPost.bind(this);
        this.scrollHandler = this.scrollHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.onGetMyPosts().then(res => {
            this.setState({getPostsStatus: 'loaded'});
        }).catch(err => {
            this.setState({getPostsStatus: 'failed'});
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectPost(postId) {
        console.log('on Select Post', postId);
        this.props.navigation.navigate('PostDetail', {postId: postId});
    }

    async scrollHandler(e){
        let windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if( windowHeight + offset >= height ){
            if (this.props.postsByMe.meta.to !== this.props.postsByMe.meta.total) {
                this.setState({getPostsStatus: 'loading'});
                await this.props.onGetMyPosts(this.props.postsByMe.links.next).then(res => {
                    this.setState({getPostsStatus: 'loaded'});
                }).catch(err => {
                    this.setState({getPostsStatus: 'failed'});
                });
            }
        }
    }

    render() {
        const {getPostsStatus} = this.state;
        const {postsByMe} = this.props;
        const postListProps = {
            posts: postsByMe,
            onSelectPost: this.onSelectPost,
            type: 'my'
        };
        return (
            <ScrollView style={styles.container} onScrollEndDrag={this.scrollHandler}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Posts</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            postsByMe && <PostList {...postListProps}/>
                        }
                        {
                            getPostsStatus === 'loading' && <ActivityIndicator size={50} color={Colors.primary1}/>
                        }
                        {
                            getPostsStatus === 'failed' && <Text style={{margin: 15}}>Failed!</Text>
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
        onGetMyPosts: (url = null) => dispatch(getMyPosts(url)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsScreen);

