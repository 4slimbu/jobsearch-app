import React from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import PostItem from "../ListItem/PostItem";
import {Divider} from "react-native-elements";
import Colors from "../../constants/colors";
import PostListMetaData from "../PostListMetaData";

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
    const {posts, type, backScreen} = props;
    const postListProps = {
        type: type,
        posts: posts,
        backScreen: backScreen
    };
    return (
        <View style={styles.postContainer}>
            <PostListMetaData meta={posts.meta} backScreen={backScreen}/>
            <PostList {...postListProps}/>
            {
                posts.meta && posts.meta.total > 10 &&
                <PostListMetaData meta={posts.meta}/>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: 'transparent',
        // marginTop: 20,
        // marginBottom: 20
    },
});

PostList.propTypes = {
    posts: PropTypes.object.isRequired,
};

export default postList;
