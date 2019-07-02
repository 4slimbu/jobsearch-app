import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getMyPosts} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";
import ContentLoading from "../../components/ContentLoading";

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
            <ScrollView style={styles.container} onScrollEndDrag={this.scrollHandler}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Posts</Text>
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            postsByMe && <PostList {...postListProps}/>
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
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        padding: 40,
        paddingLeft: 20,
        backgroundColor: '#acacac',
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

