import React, {Component} from 'react';
import appData from "../../constants/app";
import globalStyles from "../../constants/globalStyle";
import {ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import Colors from '../../constants/colors';
import {Button, Image, Icon} from "react-native-elements";
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

        return _.map(comments, (comment, key) => {
            const commentProfileImageUrl = comment && comment.profile_pic;
            const commentProfileImageSrc = commentProfileImageUrl && commentProfileImageUrl.length > 0 ? {uri: commentProfileImageUrl} : appData.app.PLACE_HOLDER_IMAGE_URL;

            return (
                <View key={key}>
                    {
                        !comment.parent_id &&
                        <View>
                            <View style={styles.commentsListWrapper}>
                                <View style={styles.commentUserAvatarContainer}>
                                    <Image source={commentProfileImageSrc} style={styles.commentUserAvatar} />
                                </View>
                                <View style={styles.commentUserContent}>
                                    <TouchableOpacity onPress={() => this.selectCommentHandler(comment.id)}>
                                        <Text style={styles.commentUserContentText}>{comment.body}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {
                                comment.replies && (
                                    _.map(comment.replies, (reply, key) => {
                                        const replyProfileImageUrl = reply && reply.profile_pic;
                                        const replyProfileImageSrc = replyProfileImageUrl && replyProfileImageUrl.length > 0 ? {uri: replyProfileImageUrl} : appData.app.PLACE_HOLDER_IMAGE_URL;

                                        return (
                                            <View key={key} style={styles.commentsListWrapperInner}>
                                                <View style={styles.commentUserAvatarContainer}>
                                                    <Image
                                                        source={replyProfileImageSrc} resizeMode={'contain'}
                                                        style={styles.commentUserAvatar}
                                                        PlaceholderContent={<ActivityIndicator/>}
                                                    />
                                                </View>
                                                <View style={styles.commentUserContent}>
                                                    <TouchableOpacity onPress={() => this.selectCommentHandler(comment.id)}>
                                                        <Text style={styles.commentUserContentText}>{reply.body}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        );
                                    })
                                )
                            }
                            {
                                activeCommentId === comment.id &&
                                <View style={{marginBottom: 15}}>
                                    <TextInput style={globalStyles.textArea}
                                               multiline={true}
                                               numberOfLines={2}
                                               value={this.state.comment}
                                               onChangeText={comment => this.setState({comment})}
                                    />

                                    <Button title="Reply" buttonStyle={globalStyles.btnPrimary}
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
                        <View style={styles.commentsListHeaderContainer}>
                            <Icon
                                name="wechat"
                                size={18}
                                type="font-awesome"
                                color={Colors.primary}
                                containerStyle={styles.iconHeader}
                            />
                            <Text style={styles.sectionHeadingWithIcon}>Comments</Text>
                        </View>
                        <View style={styles.commentsListContainer}>
                            {this.comments()}
                        </View>
                    </View>
                }
                <View style={styles.commentsListContainer}>
                    <Text style={styles.sectionHeading}>Leave a Comment</Text>
                    <Text style={styles.sectionSubHeading}>Leave a comment to apply. This comment section is private for each
                        user.</Text>
                    <View style={globalStyles.formRow}>
                        <TextInput
                            style={globalStyles.textArea}
                            multiline={true}
                            numberOfLines={2}
                            value={this.state.comment}
                            onChangeText={comment => this.setState({comment})}
                        />
                    </View>
                    <View>
                        <Button
                            title="Comment" buttonStyle={globalStyles.btnPrimary}
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

    
    sectionHeading: {
        fontSize: 18,
        fontWeight: '100',
    },

    sectionHeadingWithIcon: {
        fontSize: 18,
        fontWeight: '100',
        marginLeft: 5,
    },

    sectionSubHeading: {
        fontSize: 14,
        fontWeight: '100',
        marginTop: 10,
        marginBottom: 10,
        color: Colors.darkGray,
    },

    commentsListHeaderContainer: {
        marginTop: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    commentsListContainer: {
        marginTop: 10,
        marginBottom: 20,
    },

    commentsListWrapper: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
    },

    commentsListWrapperInner: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
        marginLeft: 20,
    },

    commentUserAvatarContainer: {
        flex: 1,
        paddingLeft: 0,
        paddingTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2.0,
        width: 40,
        height: 40,
        borderRadius: 40/2,
    },
    commentUserAvatar: {
        width: 40,
        height: 40,
        borderRadius: 40/2,
    },
    commentUserContent: {
        flex: 3,
        backgroundColor: '#fafafa',
        borderRadius: 10,
        padding: 20,
        borderWidth: 1,
        borderColor: Colors.lightGray,
    },
    commentUserContentText: {
        color: Colors.grey1,
        lineHeight: 24,
        fontSize: 13,
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
