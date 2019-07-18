import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator, Picker} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getMyPosts, resetPostsByMe, setPostsByMe} from "../../store/actions/postActions";
import PostList from "../../components/List/PostList";
import ContentLoading from "../../components/ContentLoading";
import * as _ from "lodash";

class MyPostsScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            selectedCategoryId: null,
        };

        this.scrollHandler = this.scrollHandler.bind(this);
        this.onSelectCategory = this.onSelectCategory.bind(this);
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

    async onSelectCategory(categoryId) {
        this.setState({selectedCategoryId: categoryId});
        this.props.resetPostsByMe();
        this._isMounted && await this.props.onGetMyPosts('', '&category=' + categoryId);
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
                    <View>
                        <View style={{ marginLeft: 20, marginRight: 20}}>
                            <Picker
                                selectedValue={this.state.selectedCategoryId}
                                style={{height: 50, width: '100%'}}
                                onValueChange={(itemValue, itemIndex) => this.onSelectCategory(itemValue)}
                            >
                                <Picker.Item value="" label="Select Category"/>
                                {
                                    _.map(this.props.categories, (category, key) => {
                                        return (
                                            <Picker.Item key={key} value={category.id} label={category.name}/>
                                        )
                                    })
                                }
                            </Picker>
                        </View>
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

