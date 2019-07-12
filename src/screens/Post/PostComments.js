import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements";
import * as _ from "lodash";
import {connect} from "react-redux";
import {saveComment} from "../../store/actions/commentActions";

class PostComments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeCommentId: null,
            comment: "",
            isLoading: false,
        };

        this.commentHandler = this.commentHandler.bind(this);
        this.selectCommentHandler = this.selectCommentHandler.bind(this);

    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    selectCommentHandler(id) {
        this.setState({
            activeCommentId: id
        });
    }

    commentHandler(postId, parentId = null) {
        if (_.isEmpty(this.state.comment)) {
            return;
        }

        const commentData = {
            post_id: postId,
            comment_body: this.state.comment,
            parent_id: parentId
        };

        this.setState({isLoading: true});
        this.props.saveComment(commentData);
        this.setState({
            ...this.state,
            comment: "",
            isLoading: false,
            activeCommentId: null
        });
    }

    comments() {
        const {activeCommentId, isLoading} = this.state;
        const {post, user} = this.props;
        const comments = post.postComments;
        const userImageUrl = user.profile_pic;
        const authorImageUrl = post.author && post.author.profile_pic;
        const userImageSrc = userImageUrl.length > 0 ? {uri: userImageUrl} : require('../../../assets/images/placeholder.png');
        const authorImageSrc = authorImageUrl && authorImageUrl.length > 0 ? {uri: authorImageUrl} : require('../../../assets/images/placeholder.png');

        return _.map(comments, (comment, key) => {
            return (
                <View key={key}>
                    {
                        !comment.parent_id &&
                        <View>
                            <View style={{flexDirection: 'row', marginBottom: 15}}>
                                <View style={{width: '20%'}}>
                                    <Image source={userImageSrc} resizeMode={'contain'}
                                           style={{
                                               width: 40,
                                               height: 40,
                                               marginBottom: 5,
                                               marginRight: 10,
                                               borderRadius: 100
                                           }}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                </View>
                                <View style={{width: '80%'}}>
                                    <TouchableOpacity style={{
                                        width: '100%',
                                        backgroundColor: '#fafafa',
                                        borderRadius: 10,
                                        padding: 10
                                    }}
                                                      onPress={() => this.selectCommentHandler(comment.id)}>
                                        <Text styles={{marginLeft: 100, color: Colors.grey3,backgroundColor: '#f1f1f1',}}>{comment.body}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                comment.replies && (
                                    _.map(comment.replies, (reply, key) => {
                                        return (
                                            <View key={key}
                                                  style={{flexDirection: 'row', marginBottom: 15, marginLeft: 25}}>
                                                <View style={{width: '20%'}}>
                                                    <Image source={authorImageSrc} resizeMode={'contain'}
                                                           style={{
                                                               width: 40,
                                                               height: 40,
                                                               marginBottom: 5,
                                                               marginRight: 10,
                                                               borderRadius: 100
                                                           }}
                                                           PlaceholderContent={<ActivityIndicator/>}
                                                    />
                                                </View>
                                                <View style={{
                                                    width: '80%',
                                                }}>
                                                    <TouchableOpacity style={{
                                                        width: '100%',
                                                        backgroundColor: '#fafafa',
                                                        borderRadius: 10,
                                                        padding: 10
                                                    }}
                                                                      onPress={() => this.selectCommentHandler(comment.id)}>
                                                        <Text styles={{
                                                            marginLeft: 100,
                                                            color: Colors.grey3,
                                                            backgroundColor: '#f1f1f1',
                                                        }}>
                                                            {reply.body}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    })
                                )
                            }
                            {
                                activeCommentId === comment.id &&
                                <View style={{marginLeft: '20%', marginBottom: 15}}>
                                    <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                               multiline={true}
                                               numberOfLines={2}
                                               value={this.state.comment}
                                               onChangeText={comment => this.setState({comment})}
                                    />

                                    <Button title="Reply"
                                            buttonStyle={{
                                                marginTop: 10,
                                                marginBottom: 5,
                                                paddingTop: 5,
                                                paddingBottom: 5,
                                                width: 100,
                                                backgroundColor:'#525252',
                                            }}
                                            buttonSize={5}
                                            onPress={() => this.commentHandler(post.id, comment.id)}
                                            loading={isLoading}
                                            disabled={isLoading}
                                    />

                                </View>
                            }
                        </View>
                    }
                </View>
            );
        });
    };

    render() {
        const {isLoading} = this.state;
        const {post} = this.props;

        return (
            <View>
                {
                    post.postComments && post.postComments.length > 0 &&
                    <View>

                        <Text style={styles.postTitle}>Comments</Text>
                        {this.comments()}
                    </View>
                }
                <View>
                    <Text style={styles.postTitle}>Leave a Comment</Text>
                    <Text>Leave a comment to apply. This comment section is private for each
                        user.</Text>
                    <View style={{marginTop: 10}}>
                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3, height:44,}}
                                   multiline={true}
                                   numberOfLines={2}
                                   value={this.state.comment}
                                   onChangeText={comment => this.setState({comment})}
                        />

                        <Button title="Comment" buttonStyle={{
                            marginTop: 10,
                            marginBottom: 5,
                            paddingTop: 15,
                            paddingBottom: 15,
                            backgroundColor:'#525252',
                        }}
                                onPress={() => this.commentHandler(post.id)}
                                buttonSize={5}
                                loading={isLoading}
                                disabled={isLoading}
                        />

                    </View>
                </View>
            </View>
        )
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
        fontSize: 16,
        fontStyle: 'italic'
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: 'bold'
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
        user: state.auth.user,
        post: state.posts.post
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        saveComment: (commentData) => dispatch(saveComment(commentData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostComments);
