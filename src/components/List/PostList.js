import React from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import PostItem from "../ListItem/PostItem";
import {Divider} from "react-native-elements";
import Colors from "../../constants/colors";

const PostList = (props) => {
    const {posts, type} = props;
    return map(posts.data, (post, key) => {
        return (
            <View key={key}>
                {key !== 0 && <Divider style={styles.divider}/>}
                <PostItem
                    post={post}
                    type={type}
                />
            </View>
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
    divider: {
        backgroundColor: Colors.grey3,
        marginTop: 20,
        marginBottom: 20
    },
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
