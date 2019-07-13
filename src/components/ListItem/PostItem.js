import React, { Component } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import { Button, Image } from "react-native-elements";
import { getFeaturedImageSrc, toReadable } from "../../utils/helper/helper";
import { connect } from "react-redux";
import { authUpdatePreferences } from "../../store/actions/authActions";
import { deletePost, deleteSavedPost } from "../../store/actions/postActions";
import { withNavigation } from "react-navigation";

class PostItem extends Component {
    constructor(props) {
        super(props);

        this.selectPostHandler = this.selectPostHandler.bind(this);
        this.savePostHandler = this.savePostHandler.bind(this);
        this.editPostHandler = this.editPostHandler.bind(this);
        this.deletePostHandler = this.deletePostHandler.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    deletePostHandler(post) {
        Alert.alert(
            'Are you sure you want to delete this post?',
            post.title,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.deletePost(post.id) },
            ],
            { cancelable: false },
        );
    }

    selectPostHandler(post) {
        this.props.navigation.navigate('PostDetail', { postId: post.id });
    }

    savePostHandler(post) {
        let isDeleted = false;
        let savedPosts = [...this.props.preferences.savedPosts];
        let index = savedPosts.indexOf(post.id);
        if (index > -1) {
            isDeleted = true;
            savedPosts.splice(index, 1);
        } else {
            savedPosts.push(post.id);
        }
        let preferences = {
            ...this.props.preferences,
            savedPosts: savedPosts
        };
        this.props.updatePreferences(preferences).then(res => {
            if (isDeleted) {
                this.props.deleteSavedPost(post.id);
            }
        });
    }

    editPostHandler(postId) {
        this.props.navigation.navigate('EditPost', { postId: postId });
    }

    deletePost(id) {
        this.props.deletePost(id);
    }

    render() {
        const { type, post, preferences } = this.props;
        const isSaved = !!(preferences.savedPosts && preferences.savedPosts.indexOf(this.props.post.id) > -1);
        const featuredImage = getFeaturedImageSrc(post.postImages);

        return (
            <View style={styles.postMainWrapper}>
                <View style={styles.postFeaturedImageWrapper}>
                    <TouchableOpacity onPress={() => this.selectPostHandler(post)}>
                        <Image source={featuredImage} resizeMode={'cover'}
                            style={styles.postFeaturedImage}
                            PlaceholderContent={<ActivityIndicator />}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.postContentWrapper}>
                    <View style={styles.postContent}>
                        <TouchableOpacity onPress={() => this.selectPostHandler(post)}>
                            <Text style={styles.postTitle}>{post.title}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.selectPostHandler(post)} style={styles.postMetaWrapper}>
                            <Text style={styles.postLocation}>near Epping</Text>
                        </TouchableOpacity>
                        <View style={styles.postButtonWrap}>
                            {(type === 'my') &&
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>

                                    <Button title="Edit" buttonStyle={[{
                                        marginBottom: 5, marginRight: 10, paddingTop: 5, paddingLeft: 15,
                                        paddingRight: 15, paddingBottom: 5, backgroundColor: '#525252'
                                    }]} buttonSize={5} onPress={() => this.editPostHandler(post.id)} />

                                    <Button title="Delete" buttonStyle={[{
                                        marginBottom: 5, paddingTop: 5,
                                        paddingBottom: 5, backgroundColor: Colors.danger
                                    }]} buttonSize={5} onPress={() => this.deletePostHandler(post)} />
                                </View>
                            }
                            {/* {!(type === 'my') &&
                                <Button title={isSaved ? 'Saved' : 'Save'} buttonStyle={[{
                                    marginBottom: 5, paddingTop: 5,
                                    paddingBottom: 5, backgroundColor:'#525252',
                                }, isSaved && {backgroundColor: '#00d600'}]}
                                        buttonSize={5} onPress={() => this.savePostHandler(post)}/>
                            } */}
                        </View>
                    </View>
                </View>
            </View>
        )
    };

}

const styles = StyleSheet.create({
    postItem: {
        padding: 10,
        marginBottom: 20,
        width: '33%',
        alignItems: 'center',
    },
    postText: {
        color: Colors.grey1,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
    postLocation: {
        color: Colors.primary,
        marginBottom: 3,
        fontSize: 13,
        marginRight: 5,
    },
    postDateMeta: {
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 12,
        marginRight: 5,
    },
    postCatMeta: {
        color: Colors.mediumGray,
        marginBottom: 5,
        fontSize: 12,
    },
    postFeaturedImageWrapper: {
        overflow: 'hidden',
        width: 120,
        height: 120,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 0,
    },
    postFeaturedImage: {
        width: 120,
        height: 120,
    },
    postContentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: 200,
        height: 120,
        flexWrap: 'wrap',
    },
    postContent: {
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexWrap: 'wrap',
    },
    postMainWrapper: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        padding: 0,
        alignItems: 'flex-start',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2.0,
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 30,
        marginRight: 30,
    },

    postMetaWrapper: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
});

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        deletePost: (id) => dispatch(deletePost(id)),
        deleteSavedPost: (id) => dispatch(deleteSavedPost(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PostItem));
