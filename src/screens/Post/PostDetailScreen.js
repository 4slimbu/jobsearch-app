import React, {Component} from 'react';
import appData from "../../constants/app";
import {ActivityIndicator, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {Button, Image, Icon} from "react-native-elements";
import * as _ from "lodash";
import {authUpdatePreferences} from "../../store/actions/authActions";
import {connect} from "react-redux";
import {getPost} from "../../store/actions/postActions";
import {toReadable} from "../../utils/helper/helper";
import ContentLoading from "../../components/ContentLoading";
import PostComments from "./PostComments";

const AdditionalImages = (props) => {
    const {post} = props;
    return _.map(post.postImages, (postImage, key) => {
        const image = postImage.url ? {uri: postImage.url} : require('../../../assets/images/placeholder.png');
        if (postImage.is_primary) {
            return;
        }
        return (
            <View key = {key} style={styles.postAddtionalImg}>
                <Image source={image} resizeMode={'contain'}
                   style={{width:'100%', height:100,}}
                   PlaceholderContent={<ActivityIndicator/>}
                />
            </View>
        );
    });
};

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
            isSaved: isSaved
        });

        this.setState({isReady: true});
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
        const featuredImage = primaryImage ? {uri: primaryImage.url} : appData.app.PLACE_HOLDER_IMAGE_URL;
        const additionalImagesProps = {
            post: post
        };
        return (
            <ScrollView style={styles.container}>
                {  post &&
                <KeyboardAvoidingView style={{flex: 1, marginBottom: 50}}
                                      behavior="padding"
                >
                    <View style={[styles.contentView]}>
                        <View style={{flex: 1}}>
                            <Image source={featuredImage} resizeMode={'cover'}
                                    style={{width: '100%', height: 250}}
                                    PlaceholderContent={<ActivityIndicator/>}
                            />
                        </View>
                        <View style={styles.headerContainer}>
                            <Text style={styles.heading}>{post.title}</Text>
                            <Text style={styles.price}>$160</Text>
                            <View style={styles.locationContainer}>
                                <Icon
                                    name="map-marker"
                                    size={14}
                                    type="font-awesome"
                                    color={Colors.mediumGray}
                                    containerStyle={{marginRight: 10}}
                                />
                                <Text style={styles.location}>Epping NSW 2121, Australia</Text>
                            </View>
                            <Text style={styles.postAuthorMeta}>By: {post.author && post.author.full_name}</Text>
                            <Text style={styles.postDateMeta}>Deadline: {toReadable(post.expire_at)}</Text>
                            
                        </View>

                        {
                            ! isReady ?
                                <ContentLoading/>
                                :
                                <View style={[{paddingLeft: 20, paddingRight: 20, marginBottom: 20}]}>
                                    {/*<View style={{flex: 1, flexDirection: 'row'}}>*/}
                                        {/*<View style={{flex: 1, marginRight: 15}}>*/}
                                            {/*<Image source={featuredImage} resizeMode={'contain'}*/}
                                                   {/*style={{width: '100%', height: 100, marginBottom: 5}}*/}
                                                   {/*PlaceholderContent={<ActivityIndicator/>}*/}
                                            {/*/>*/}
                                            {/*/!* <Button title={this.state.isSaved ? 'Saved' : 'Save'}*/}
                                                    {/*buttonStyle={[*/}
                                                        {/*{marginBottom: 5, paddingTop: 5, paddingBottom: 5},*/}
                                                        {/*this.state.isSaved && {backgroundColor: 'grey'}*/}
                                                    {/*]}*/}
                                                    {/*buttonSize={5} onPress={() => this.savePostHandler(post.id)}/> *!/*/}
                                            {/**/}
                                        {/*</View>*/}
                                        {/*<View style={{flex: 3}}>*/}
                                            {/*<Text style={styles.postAuthorMeta}>By: {post.author && post.author.full_name}</Text>*/}
                                            {/*<Text style={styles.postDateMeta}>Deadline: {toReadable(post.expire_at)}</Text>*/}
                                        {/*</View>*/}
                                    {/*</View>*/}
                                    <View style={styles.postContentContainer}>
                                        <AdditionalImages {...additionalImagesProps}/>
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
        marginBottom: 15,
        marginTop:15,
    },
    heading: {
        color: Colors.darkGray,
        fontSize: 18,
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
        color: Colors.mediumGray,
        fontSize: 12,
        fontWeight: 'normal',
    },
    additionalImg: {
        display:'flex',
        flexDirection:'row',
        paddingBottom:20,
    },
    postAddtionalImg: {
        width: '33.33%', 
        height: 100, 
        marginBottom: 5,
    }
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
        getPost: (postId) => dispatch(getPost(postId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailScreen);
