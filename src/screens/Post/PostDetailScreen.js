import React, {Component} from 'react';
import appData from "../../constants/app";
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {Icon, Image} from "react-native-elements";
import * as _ from "lodash";
import {authUpdatePreferences} from "../../store/actions/authActions";
import {connect} from "react-redux";
import {getPost} from "../../store/actions/postActions";
import {prettyDistance, toReadable} from "../../utils/helper/helper";
import ContentLoading from "../../components/ContentLoading";
import PostComments from "./PostComments";
import KCarousel from "../../components/Carousel/KCarousel";
import NavigationService from "../../services/NavigationService";
import {uiUpdateViewHistory} from "../../store/actions/uiActions";

class PostDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: {},
            isSaved: false,
            comment: "",
            isReady: false,
            isLoading: false,
        };

        this.savePostHandler = this.savePostHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        const {params} = this.props.navigation.state;
        const postId = params ? params.postId : null;
        const {savedPosts} = this.props.preferences;
        const isSaved = savedPosts && savedPosts.indexOf(postId) > -1;

        this._isMounted && await this.props.getPost(postId) && this.setState({
            ...this.state,
            post: this.props.posts.post,
            isSaved: isSaved,
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
    }

    render() {
        const {isReady} = this.state;
        const {post} = this.props.posts;
        const primaryImage = _.find(post.postImages, {"is_primary": true});
        const featuredImage = primaryImage ? {uri: primaryImage.url} : require("../../../assets/images/placeholder.png");
        const authorImage = post.author && post.author.profile_pic ? {uri: post.author.profile_pic} : require("../../../assets/images/user-hp.png");

        return (
            <ScrollView style={styles.container}>
                {  post && isReady &&
                <KeyboardAvoidingView style={{flex: 1, marginBottom: 50}}
                                      behavior="padding"
                >
                    <View style={[styles.contentView]}>
                        <View style={{flex: 1, height: appData.app.SCREEN_WIDTH * 3 / 5}}>
                            {post.postImages && <KCarousel data={post.postImages}/>}
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>{post.title}</Text>
                            <Text style={styles.price}>{ prettyDistance(post.distance) }</Text>
                            <View style={styles.locationContainer}>
                                <Icon
                                    name="map-marker"
                                    size={22}
                                    type="font-awesome"
                                    color={Colors.primary}
                                    containerStyle={{marginRight: 10}}
                                />
                                <Text style={styles.location}>{ post.address}</Text>
                            </View>
                        </View>

                        {
                            ! isReady ?
                                <ContentLoading/>
                                :
                                <View style={[{paddingLeft: 20, paddingRight: 20, marginBottom: 20}]}>
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: "center",}}>
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
                                        {/*<Text style={styles.postContentTitle}>Description</Text>*/}
                                        <Text style={styles.postContent}>{post.body}</Text>
                                    </View>
                                    <View>
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
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 2.0,
        width: 60,
        height: 60,
        borderRadius: 60/2,
    },
    postAuthorProfilePic: {
        width: 60,
        height: 60,
        borderRadius: 60/2,
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
        marginTop:15,
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
    },
    location: {
        color: Colors.darkGray,
        fontSize: 12,
        fontWeight: 'normal',
    },
    additionalImg: {
        display:'flex',
        flexDirection:'row',
        paddingBottom:20,
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen);
