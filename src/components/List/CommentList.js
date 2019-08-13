import React, {PureComponent} from "react";
import {FlatList, StyleSheet, View} from "react-native";

import CommentItem from "../ListItem/CommentItem";
import {generateUniqueId} from "../../utils/helper/helper";

class CommentList extends PureComponent {
    render() {
        const {comments, onScroll} = this.props;
        return (
            <View style={styles.commentContainer}>
                <FlatList
                    data={comments}
                    keyExtractor={(item, key) => generateUniqueId(item.id)}
                    renderItem={({item, key}) =>
                        <CommentItem
                            isFirst={key === 0}
                            comment={item}
                        />
                    }
                    onEndReached={onScroll}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        flexDirection: 'column',
    },
});

export default CommentList;
