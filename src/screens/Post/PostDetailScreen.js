import React, {Component} from 'react';
import globalStyles from "../../constants/globalStyle";
import appData from "../../constants/app";
import {
    ActivityIndicator, Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TouchableOpacity,
    View
} from 'react-native';
import Colors from '../../constants/colors';
import {Image} from "react-native-elements";
import {authUpdatePreferences} from "../../store/actions/authActions";
import {connect} from "react-redux";
import {flagPost, getPost} from "../../store/actions/postActions";
import {prettyDistance, toReadable} from "../../utils/helper/helper";
import PostComments from "./PostComments";
import KCarousel from "../../components/Carousel/KCarousel";
import {uiUpdateViewHistory} from "../../store/actions/uiActions";
import {FontAwesome, MaterialIcons} from "@expo/vector-icons";

class PostDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            isSaved: false,
            isFlagged: false,
            comment: "",
            isReady: false,
            isLoading: false,
        };

        this.savePostHandler = this.savePostHandler.bind(this);
        this.flagPostHandler = this.flagPostHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        const {params} = this.props.navigation.state;
        const postId = params ? params.postId : null;
        const {savedPosts, flaggedPosts} = this.props.preferences;
        const isSaved = savedPosts && savedPosts.indexOf(postId) > -1;
        const isFlagged = flaggedPosts && flaggedPosts.indexOf(postId) > -1;

        this._isMounted && await this.props.getPost(postId) && this.setState({
            ...this.state,
            post: this.props.posts.post,
            isSaved: isSaved,
            isFlagged: isFlagged,
            isReady: true
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    savePostHandler(postId) {
        this.setState({
            isSaved: !this.state.isSaved
        });

        let savedPosts = this.props.preferences.savedPosts ? [...this.props.preferences.savedPosts] : [];
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

    flagPostHandler(postId) {
        if (this.state.isFlagged) {
            Alert.alert(
                'You have already flagged this post.',
                "",
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                ],
            );

            return;
        }

        Alert.alert(
            'Are you sure you want to report this post?',
            "",
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => this.flagPost(postId) },
            ],
            { cancelable: false },
        );
    }

    flagPost(postId) {
        this.setState({
            isFlagged: !this.state.isFlagged
        });

        let flaggedPosts = this.props.preferences.flaggedPosts ? [...this.props.preferences.flaggedPosts] : [];
        let index = flaggedPosts.indexOf(postId);
        if (index > -1) {
            flaggedPosts.splice(index, 1);
        } else {
            flaggedPosts.push(postId);
        }
        let preferences = {
            ...this.props.preferences,
            flaggedPosts: flaggedPosts
        };
        this.props.onUpdatePreferences(preferences);

        this.props.flagPost(postId);
    }

    render() {
        const {isReady, isSaved, isFlagged} = this.state;
        const {post} = this.props.posts;
        const authorImage = post.author && post.author.profile_pic ? {uri: post.author.profile_pic} : require("../../../assets/images/user-hp.png");

        return (
            <ScrollView style={styles.container}>
                {post && isReady &&
                <KeyboardAvoidingView style={{flex: 1, marginBottom: 50}}
                                      behavior="padding"
                >
                    <View style={[styles.contentView]}>
                        <View style={{flex: 1, height: appData.app.SCREEN_WIDTH * 3 / 5}}>
                            {post.postImages && <KCarousel data={post.postImages}/>}
                        </View>
                        <View style={styles.headerContainer}>
                            <Text selectable={true} style={styles.heading}>{post.title}</Text>
                            <Text style={styles.price}>{ prettyDistance(post.distance) }</Text>
                            <View style={styles.locationContainer}>
                                <View style={styles.locationIcon}>
                                    <FontAwesome
                                        name="map-marker"
                                        size={22}
                                        color={Colors.primary}
                                    />
                                </View>
                                <Text selectable={true} style={styles.location}>{ post.address}</Text>
                                <View style={styles.postActions}>
                                    <TouchableOpacity onPress={() => this.savePostHandler(post.id)}>
                                        <MaterialIcons
                                            name="watch-later"
                                            size={22}
                                            color={isSaved ? Colors.yellow : Colors.greyOutline}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => this.flagPostHandler(post.id)}>
                                        <MaterialIcons
                                            name="report"
                                            size={22}
                                            color={isFlagged ? Colors.primary : Colors.greyOutline}
                                            containerStyle={{marginLeft: 14}}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {
                            ! isReady ?
                            <ContentLoading/>
                            :
                            <View>
                                <View style={globalStyles.formFlexColumn}>
                                    <View style={globalStyles.formFlexRow}>
                                        <View style={styles.postAuthorProfilePicContainer}>
                                            <Image source={authorImage} resizeMode={'cover'}
                                                    style={styles.postAuthorProfilePic}
                                                    PlaceholderContent={<ActivityIndicator/>}
                                            />
                                        </View>
                                        <View style={styles.postAuthorMetaData}>
                                            <Text style={styles.postAuthorMeta}>{post.author && post.author.full_name}</Text>
                                            <Text style={styles.postDateMeta}>{toReadable(post.created_at)}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.postContentContainer}>
                                        <Text selectable={true} style={styles.postContent}>{post.body}</Text>
                                    </View>
                                </View>
                              
                                <View style={globalStyles.formFlexColumn}>
                                    <PostComments/>
                                </View>
                            </View>
                       
                        }
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
        padding: 20,
        backgroundColor: Colors.lightGray,
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
        color: Colors.darkGray,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorProfilePicContainer: {
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2.0,
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
    },
    postAuthorProfilePic: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
    },
    postAuthorMetaData: {
        flex: 3,
    },
    postAuthorMeta: {
        color: Colors.darkGray,
        fontSize: 16,
    },
    postDateMeta: {
        color: Colors.darkGray,
        fontSize: 12,
        fontWeight: 'normal',
    },
    postContentContainer: {
        marginTop: 15,
        padding: 20,
        backgroundColor: Colors.lightGray,
        borderRadius: 5,
    },
    postContentTitle: {
        fontSize: 18,
        fontWeight: '100',
    },
    postContent: {
        color: Colors.darkGray,
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 15,
        marginTop: 10,
    },
    heading: {
        color: Colors.darkGray,
        fontSize: 24,
        fontWeight: 'normal',
        marginBottom: 10,
    },
    price: {
        color: Colors.darkGray,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    locationContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    locationIcon: {
        marginRight: 10,
    },
    location: {
        color: Colors.darkGray,
        fontSize: 13,
        fontWeight: 'normal',
    },
    postActions: {
        marginLeft: 'auto',
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    additionalImg: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 20,
    },
    postAdditionalImg: {
        backgroundColor: 'red',
        width: '100%',
        marginBottom: 5,
    },

});

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        user: state.auth.user,
        posts: state.posts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        uiUpdateViewHistory: (navData) => dispatch(uiUpdateViewHistory(navData)),
        getPost: (postId) => dispatch(getPost(postId)),
        flagPost: (postId) => dispatch(flagPost(postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen);
