import React from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import PostItem from "../ListItem/PostItem";

const PostList = (props) => {
    const {savedPosts, posts, onSavePost, onSelectPost, type} = props;
    return map(posts.data, (post, key) => {
        const isSaved = savedPosts && savedPosts.indexOf(post.id) > -1;
        return (
            <PostItem
                type={type}
                key={key}
                isFirst={key === 0}
                isSaved={isSaved}
                post={post}
                onSelectPost={() => onSelectPost(post.id)}
                onSavePost={() => onSavePost(post.id)}
            />
        )
    });
};

const postList = props => {
    const {savedPosts, posts, onSelectPost, onSavePost, type} = props;
    const postListProps = {
        type: type,
        savedPosts: savedPosts,
        posts: posts,
        onSelectPost: onSelectPost,
        onSavePost: onSavePost,
    };
    return (
        <View style={styles.postContainer}>
            <PostList {...postListProps}/>
        </View>
    );
};

const styles = StyleSheet.create({
    postContainer: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        // flexWrap: 'wrap',
        // width: '100%',
        // marginTop: 20,
    },
});

PostList.propTypes = {
    savedPosts: PropTypes.array,
    posts: PropTypes.object.isRequired,
    onSavePost: PropTypes.func,
    onSelectPost: PropTypes.func.isRequired
};

export default postList;
