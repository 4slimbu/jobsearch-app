import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import Colors from '../../constants/colors';
import globalStyles from "../../constants/globalStyle";
import {connect} from "react-redux";
import {getMyPosts, resetPostsByMe, setPostsByMe} from "../../store/actions/postActions";
import MyPostList from "../../components/List/MyPostList";
import ContentLoading from "../../components/ContentLoading";
import * as _ from "lodash";


class MyPostsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
        };

        this.scrollHandler = this.scrollHandler.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});
        this._isMounted && await this.props.onGetMyPosts().then(res => {
            this.setState({isLoading: false});
        }).catch(err => {
            this.setState({isLoading: false});
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    async scrollHandler(e){
        let windowHeight = Dimensions.get('window').height,
            height = e.nativeEvent.contentSize.height,
            offset = e.nativeEvent.contentOffset.y;
        if( windowHeight + offset >= height ){
            if (this.props.postsByMe.meta.to !== this.props.postsByMe.meta.total) {
                this.setState({isLoading: true});
                await this.props.onGetMyPosts(this.props.postsByMe.links.next).then(res => {
                    this.setState({isLoading: false});
                }).catch(err => {
                    this.setState({isLoading: false});
                });
            }
        }
    }

    render() {
        const {isLoading} = this.state;
        const {postsByMe} = this.props;
        const postListProps = {
            type: 'my',
            posts: postsByMe
        };
        return (
            <ScrollView style={globalStyles.scrollViewContainer} onScrollEndDrag={this.scrollHandler}>
                <View style={globalStyles.scrollViewContentView}>
                    <View style={globalStyles.headerContainer}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AddPost')}>
                            <View style={globalStyles.btnPrimaryOutline}>
                                <Text style={globalStyles.btnPrimaryOutlineTitle}>Create New Listing</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View>
                        {
                            postsByMe && <MyPostList {...postListProps}/>
                        }
                    </View>
                    <View style={{height: 100}}>
                        {
                            isLoading && <ContentLoading/>
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = state => {
    return {
        postsByMe: state.posts.postsByMe,
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onGetMyPosts: (url = null, query = null) => dispatch(getMyPosts(url, query)),
        resetPostsByMe: () => dispatch(resetPostsByMe())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPostsScreen);

