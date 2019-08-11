import React from "react";
import {FlatList, StyleSheet, View} from "react-native";
import PostListMetaData from "../PostListMetaData";
import PostItem from "../ListItem/PostItem";

const PostList = props => {
    const {type, posts, backScreen, isFilterActive, filter, onRefresh, onScroll} = props;
    return (
        <View style={styles.postListContainer} >
            <FlatList
                data={posts.data}
                keyExtractor={(item, key) => key}
                ListHeaderComponent={
                    <PostListMetaData meta={posts.meta} backScreen={backScreen} isFilterActive={isFilterActive} filter={filter} onRefresh={onRefresh}/>
                }
                renderItem={({item, key}) =>
                    <PostItem
                        post={item}
                        type={type}
                        onRefresh={onRefresh}
                    />
                }
                ListFooterComponent={
                    posts.meta && posts.meta.total > 10 &&
                    <PostListMetaData meta={posts.meta} backScreen={backScreen} isFilterActive={isFilterActive} filter={filter} onRefresh={onRefresh}/>
                }
                numColumns={2}
                onEndReached={onScroll}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    postListContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 150
    },
});

export default PostList;
