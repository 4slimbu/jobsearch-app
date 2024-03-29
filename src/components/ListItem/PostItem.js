import React, {Component} from "react";
import {ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import {Image} from "react-native-elements";
import {getFeaturedImageSrc, prettyDistance, trimListTitle, trimNavTitle} from "../../utils/helper/helper";
import {connect} from "react-redux";
import {authUpdatePreferences} from "../../store/actions/authActions";
import {deletePost} from "../../store/actions/postActions";
import {withNavigation} from "react-navigation";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";


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
        this.props.navigation.navigate('PostDetail', { postId: post.id, title: trimNavTitle(post.title) });
    }

    savePostHandler(post) {
        let isDeleted = false;
        let savedPosts = this.props.preferences.savedPosts ? [...this.props.preferences.savedPosts] : [];
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
        this.props.updatePreferences(preferences);
    }

    editPostHandler(postId) {
        const {onRefresh} = this.props;
        this.props.navigation.navigate('EditPost', { postId: postId, onRefresh: onRefresh });
    }

    deletePost(id) {
        this.props.deletePost(id);
        this.props.onRefresh();
    }

    render() {
        const { type, post, preferences } = this.props;
        const isSaved = !!(preferences.savedPosts && preferences.savedPosts.indexOf(this.props.post.id) > -1);
        const featuredImage = getFeaturedImageSrc(post.postImages);

        return (
            <View style={styles.postMainWrapper}>
                <View style={styles.postFeaturedImageWrapper}>
                    <TouchableOpacity onPress={() => this.selectPostHandler(post)} >
                        { featuredImage && 
                            <Image source={featuredImage} resizeMode={'cover'}
                                style={styles.postFeaturedImage}
                                PlaceholderContent={<ActivityIndicator />}
                            />
                        }
                        { !featuredImage &&
                            <View style={{alignItems: 'center'}}>
                                <FontAwesome
                                    name="photo"
                                    color={Colors.primary}
                                    size={45}
                                />
                            </View>
                        }
                    </TouchableOpacity>
                </View>
                <View style={styles.postContentWrapper}>
                    <View style={styles.postContent}>
                        <TouchableOpacity onPress={() => this.selectPostHandler(post)}>
                            <Text style={styles.postTitle}>{trimListTitle(post.title)}</Text>
                        </TouchableOpacity>
                    </View>
                        {(type !== 'my') &&
                            <View style={styles.postMeta}>
                                <View style={styles.postLocationIcon}>
                                    <FontAwesome
                                        name="map-marker"
                                        size={18}
                                        color={Colors.primary}
                                    />
                                </View>
                                <Text style={styles.postLocation}>{ prettyDistance(post.distance) }</Text>
                                <View style={styles.postActions}>
                                    <TouchableOpacity onPress={() => this.savePostHandler(post)}>
                                        <MaterialIcons
                                            name="watch-later"
                                            size={18}
                                            color={isSaved ? Colors.yellow : Colors.greyOutline}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {(type === 'my') &&
                            <View style={styles.postMeta}>
                                <View style={styles.postLocationIcon}>
                                    <FontAwesome
                                        name="edit"
                                        size={22}
                                        color={Colors.primary}
                                        containerStyle={{marginRight: 14}}
                                        onPress={() => this.editPostHandler(post.id)}
                                    />
                                </View>
                                <View style={styles.postLocationIcon}>
                                    <FontAwesome
                                        name="trash"
                                        size={22}
                                        color={Colors.primary}
                                        containerStyle={{marginRight: 14}}
                                        onPress={() => this.deletePostHandler(post)}
                                    />
                                </View>
                            </View>
                        }
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
    
    postTitle: {
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 14,
        fontWeight: '600',
        textTransform: 'capitalize',
    },
   
    postMeta: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginTop: 5,
        padding: 10,
    },

    postLocationIcon: {
        marginRight: 5,
        lineHeight: 18,
    },

    postLocation: {
        color: Colors.darkGray,
        fontSize: 13,
        lineHeight: 18,
    },

    postActions: {
        marginLeft: 'auto',
        lineHeight: 18,
    },

    
    postFeaturedImageWrapper: {
        overflow: 'hidden',
        width: '100%',
        height: 120,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        display: 'flex',
        justifyContent: "center",
        backgroundColor: Colors.lightGray,
    },
    postFeaturedImage: {
        width: '100%',
        height: 120,
    },
    postContentWrapper: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        textAlign: 'center',
        maxWidth: 200,
        height: 100,
        flexWrap: 'wrap',
        alignSelf: 'stretch',
    },
    postContent: {
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    postMainWrapper: {
        display: 'flex',
        flex: 1/2,
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 0,
        alignItems: 'flex-start',
        borderRadius: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2.0,
        marginTop: 5,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(PostItem));
