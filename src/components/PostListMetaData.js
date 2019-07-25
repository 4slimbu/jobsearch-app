import React from 'react';
import { View, Text } from 'react-native';

const PostListMetaData = props => {
    const {meta} = props;
    return (
        meta && meta.total ?
        <View style={{marginLeft: 30, marginRight: 30, marginTop: 20}}>
            <Text>Showing 1 - {meta.to} of {meta.total}</Text>
        </View> :
        <View></View>
    )
};

export default PostListMetaData;