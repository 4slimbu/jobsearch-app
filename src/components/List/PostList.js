import React, {Component} from "react";
import {FlatList, StyleSheet, View} from "react-native";
import PostListMetaData from "../PostListMetaData";
import PostItem from "../ListItem/PostItem";

class PostList extends Component {
    render() {
        const {type, posts, filter, onFilterUpdate, onRefresh, onScroll} = this.props;

        const postListMetaDataProps = {
            meta: posts.meta,
            filter: filter,
            onFilterUpdate: onFilterUpdate
        };

        const postItemProps = {
            type: type,
            onRefresh: onRefresh
        };

        return (
            <View style={styles.postListContainer} >
                <FlatList
                    data={posts.data}
                    keyExtractor={(item, key) => key}
                    ListHeaderComponent={
                        <PostListMetaData {...postListMetaDataProps}/>
                    }
                    renderItem={({item, key}) =>
                        <PostItem post={item} {...postItemProps}/>
                    }
                    ListFooterComponent={
                        posts.meta && posts.meta.total > 10 &&
                        <PostListMetaData {...postListMetaDataProps}/>
                    }
                    numColumns={2}
                    bounces={false}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => onScroll()}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    postListContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 118
    },
});

export default PostList;
