import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {FontAwesome} from '@expo/vector-icons';
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import {Divider} from "react-native-elements";
import {toReadable} from "../../utils/helper/helper";
import NavigationService from "../../services/NavigationService";

const CommentItem = props => {
    const {comment, isFirst} = props;
    return (
        <View>
            { !isFirst &&  <Divider style={styles.divider}/> }
            <TouchableOpacity onPress={() => NavigationService.navigate('PostDetail', { postId: comment.post_id })} style={styles.activityListContainer}>
                <View style={styles.activityListHeaderContainer}>
                    <View style={styles.activityIcon}>
                        <FontAwesome
                            color={Colors.primary}
                            name="wechat"
                            size={22}
                        />
                    </View>
                    <View style={styles.activityTitle}>
                        <Text style={styles.activityName}>{comment.post_name}</Text>
                        <Text style={styles.dateMeta}>{toReadable(comment.created_at)}</Text>
                    </View>
                </View>
                <View style={styles.activityBodyContainer}>
                    <Text style={styles.activityBody}>{comment.body}</Text>
                </View>
            </TouchableOpacity>

        </View>
    )
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.mediumGray,
        marginTop: 5,
        marginBottom: 5,
    },

    activityListContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
    },

    activityListHeaderContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    activityIcon: {
        justifyContent: "center",
    },

    activityTitle: {
        paddingLeft: 10,
    },

    activityName: {
        color: Colors.darkGray,
        fontSize: 16,
        fontWeight: 'bold',
    },

    activityBodyContainer: {

    },

    activityBody: {
        backgroundColor: Colors.lighterGray,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.mediumGray,
        padding: 20,
        marginTop: 20,
        flexGrow: 1,
    },

    dateMeta: {
        color: Colors.darkGray,
        fontSize: 12,
    }

});

CommentItem.propTypes = {
    isFirst: PropTypes.bool.isRequired,
    comment: PropTypes.object.isRequired
};

export default CommentItem;
