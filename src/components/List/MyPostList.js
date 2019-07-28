import React from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import MyPostItem from "../ListItem/MyPostItem";
import {Divider} from "react-native-elements";
import Colors from "../../constants/colors";

const MyPostList = (props) => {
    const {posts, type} = props;
    return map(posts.data, (post, key) => {
        return (
            <View key={key}>
                {key !== 0 && <Divider style={styles.divider}/>}
                <MyPostItem
                    post={post}
                    type={type}
                />
            </View>
        )
    });
};

const myPostList = props => {
    const {posts, type} = props;
    const postListProps = {
        type: type,
        posts: posts,
    };
    return (
        <View style={styles.postContainer}>
            <MyPostList {...postListProps}/>
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

MyPostList.propTypes = {
    posts: PropTypes.object.isRequired,
};

export default myPostList;
