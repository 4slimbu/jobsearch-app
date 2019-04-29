import React from "react";
import {StyleSheet, View, Text} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import CommentItem from "../ListItem/CommentItem";

const CommentList = (props) => {
    const {comments} = props;

    return map(comments, (comment, key) => {
        return (
            <CommentItem
                key={key}
                isFirst={key === 0}
                comment={comment}
            />
        )
    });
};

const commentList = props => {
    const {comments} = props;
    const commentListProps = {
        comments: comments,
    };
    return (
        <View style={styles.commentContainer}>
            <CommentList {...commentListProps}/>
        </View>
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
});

CommentList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default commentList;
