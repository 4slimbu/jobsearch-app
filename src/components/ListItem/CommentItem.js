import React from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import {Divider} from "react-native-elements";
import {toReadable} from "../../utils/helper/helper";

const CommentItem = props => {
    const {comment, isFirst} = props;
    console.log('comment item', comment.body);
    return (
        <View style={{width: '100%'}}>
            { !isFirst &&  <Divider style={styles.divider}/> }

            <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20, width: '100%'}}>
                <Text style={styles.title}>{comment.post_name}</Text>
                <Text style={styles.dateMeta}>{toReadable(comment.created_at)}</Text>
                <Text style={[styles.content, {borderWidth: 1, borderColor: Colors.grey4, padding: 10}]}>{comment.body}</Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.grey3,
        marginTop: 20,
        marginBottom: 20
    },
    title: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    dateMeta: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    content: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20
    },
});

CommentItem.propTypes = {
    isFirst: PropTypes.bool.isRequired,
    comment: PropTypes.object.isRequired
};

export default CommentItem;
