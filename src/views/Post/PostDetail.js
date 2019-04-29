import React, {Component} from 'react';
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import * as _ from "lodash";
import {authUpdatePreferences} from "../../store/actions/auth";
import {connect} from "react-redux";
import {getPost} from "../../store/actions/post";
import {saveComment} from "../../store/actions/comment";
import {toReadable} from "../../utils/helper/helper";

const AdditionalImages = (props) => {
    const {post} = props;
    return _.map(post.postImages, (postImage, key) => {
        const image = postImage.url ? {uri: postImage.url} : require('../../../assets/images/placeholder.png');
        if (postImage.is_primary) {
            return;
        }
        return (
            <Image key={key} source={image} resizeMode={'contain'}
                   style={{width: '100%', height: 100, marginBottom: 5}}
                   PlaceholderContent={<ActivityIndicator/>}
            />
        );
    });
};

const Comments = (props) => {
    const {comments} = props;
    return _.map(comments, (comment, key) => {
        return (
            <View key={key}>
                <View style={{flexDirection: 'row', marginBottom: 15}}>
                    <Icon color={Colors.grey3} name='user' size={30}/>
                    <Text styles={{marginLeft: 100, color: Colors.grey3}}>{comment.body}</Text>
                </View>
                {
                    comment.reply && (
                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                            <Icon color={Colors.grey4} name='long-arrow-right' size={20}/>
                            <Text styles={{marginLeft: 100, color: Colors.grey3}}>{comment.reply.body}</Text>
                        </View>
                    )
                }
            </View>
        );
    });
};

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            isSaved: false,
            comment: ""
        };

        this.onSavePost = this.onSavePost.bind(this);
        this.onComment = this.onComment.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        const {params} = this.props.navigation.state;
        const postId = params ? params.postId : null;
        const {savedPosts} = this.props.preferences;
        const isSaved = savedPosts.indexOf(postId) > -1;

        this._isMounted && await this.props.onGetPost(postId) && this.setState({
            ...this.state,
            post: this.props.posts.post,
            isSaved: isSaved
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSavePost(postId) {
        this.setState({
            isSaved: !this.state.isSaved
        });

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

    onComment(postId, parentId = null) {
        if (_.isEmpty(this.state.comment)) {
            alert('Comment is empty!');
            return;
        }

        const commentData = {
            post_id: postId,
            comment_body: this.state.comment,
            parent_id: parentId
        };

        this.props.onSaveComment(commentData);
        this.setState({
            ...this.state,
            comment: ""
        })
    }

    render() {
        const {post} = this.props.posts;
        const primaryImage = _.find(post.postImages, {"is_primary": true});
        const featuredImage = primaryImage ? {uri: primaryImage.url} : require('../../../assets/images/placeholder.png');
        const additionalImagesProps = {
            post: post
        };
        const commentsProps = {
            comments: post.postComments
        };
        return (
            <ScrollView style={styles.container}>
                {  post &&
                <KeyboardAvoidingView style={{flex: 1, marginBottom: 50}}
                                      behavior="padding"
                >
                    <View style={[styles.contentView]}>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>{post.title}</Text>
                        </View>

                        <View style={[{paddingLeft: 20, paddingRight: 20, marginBottom: 20}]}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1, marginRight: 15}}>
                                    <Image source={featuredImage} resizeMode={'contain'}
                                           style={{width: '100%', height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                    <Button title={this.state.isSaved ? 'Saved' : 'Save'}
                                            buttonStyle={[
                                                {marginBottom: 5, paddingTop: 5, paddingBottom: 5},
                                                this.state.isSaved && {backgroundColor: 'grey'}
                                            ]}
                                            buttonSize={5} onPress={() => this.onSavePost(post.id)}/>
                                    <AdditionalImages {...additionalImagesProps}/>
                                </View>
                                <View style={{flex: 3}}>
                                    <Text style={styles.postAuthorMeta}>By: {post.author && post.author.full_name}</Text>
                                    <Text style={styles.postDateMeta}>Deadline: {toReadable(post.expire_at)}</Text>
                                    <Text style={styles.postContent}>{post.body}</Text>
                                    <View>
                                        <Text style={styles.postTitle}>Comments</Text>
                                        <Comments {...commentsProps}/>
                                    </View>

                                    <View>
                                        <Text style={styles.postTitle}>Leave a Comment</Text>
                                        <Text>Leave a comment to apply. This comment section is private for each
                                            user.</Text>
                                        <View>
                                            <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                                       multiline={true}
                                                       numberOfLines={2}
                                                       value={this.state.comment}
                                                       onChangeText={comment => this.setState({comment})}
                                            />

                                            <Button title="Comment" buttonStyle={{
                                                marginTop: 10,
                                                marginBottom: 5,
                                                paddingTop: 5,
                                                paddingBottom: 5
                                            }}
                                                    onPress={() => this.onComment(post.id)}
                                                    buttonSize={5}/>

                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                }
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
        backgroundColor: '#4F80E1',
        marginBottom: 20,
    },
    keyboardAvoidingViewInner: {
        flex: 1,
        justifyContent: "flex-end",
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
        marginBottom: 15,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 15
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
        preferences: state.auth.user.preferences,
        posts: state.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        onSaveComment: (commentData) => dispatch(saveComment(commentData)),
        onGetPost: (postId) => dispatch(getPost(postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);
