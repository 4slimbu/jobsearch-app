import React from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import {Button, Divider, Image} from "react-native-elements";
import * as _ from "lodash";
import {showExcerpt, toReadable} from "../../utils/helper/helper";

const PostItem = props => {
    const {post, onSelectPost, onSavePost, isFirst, isSaved, type} = props;
    const primaryImage = _.find(post.postImages, {"is_primary": true});
    const featuredImage = primaryImage ? {uri: primaryImage.url} : require('../../../assets/images/placeholder.png');

    return (
        <View>
            { !isFirst &&  <Divider style={styles.divider}/> }

            <View style={{paddingLeft: 20, paddingRight: 20}}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1, marginRight: 15}}>
                        <TouchableOpacity onPress={onSelectPost}>
                            <Image source={featuredImage} resizeMode={'contain'}
                                   style={{width: '100%', height: 100, marginBottom: 5}}
                                   PlaceholderContent={<ActivityIndicator/>}
                            />
                        </TouchableOpacity>
                        {   ! (type === 'my') &&
                            <Button title={isSaved ? 'Saved' : 'Save'} buttonStyle={[{marginBottom: 5, paddingTop: 5,
                                paddingBottom: 5}, isSaved && {backgroundColor: 'grey'}]}
                                    buttonSize={5} onPress={onSavePost}/>
                        }
                        {/*<Button title="Comment" buttonStyle={{marginBottom: 5, paddingTop: 5, paddingBottom: 5}}*/}
                        {/*        buttonSize={5} onPress={onSelectPost}/>*/}
                    </View>
                    <View style={{flex: 3}}>
                        <TouchableOpacity onPress={onSelectPost}>
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postAuthorMeta}>By: {post.author && post.author.full_name}</Text>
                            <Text style={styles.postDateMeta}>Deadline: {toReadable(post.expire_at)}</Text>
                            <Text style={styles.postContent}>{showExcerpt(post.body, 100)}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    postItem: {
        padding: 10,
        marginBottom: 20,
        width: '33%',
        alignItems: 'center',
    },
    postText: {
        color: Colors.grey1,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20
    },
});

PostItem.propTypes = {
    onSavePost: PropTypes.func,
    onSelectPost: PropTypes.func.isRequired
};

export default PostItem;
