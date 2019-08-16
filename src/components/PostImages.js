import React from "react";
import * as _ from "lodash";
import {Image, View, StyleSheet} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Colors from "../constants/colors";

const PostImages = (props) => {
    const {type, images, removeImageHandler} = props;
    return _.map(images, (image, key) => {
        return (
            <View style={{}} key={key}>
                <FontAwesome
                    color={Colors.primary}
                    name="trash"
                    size={22}
                    onPress={() => removeImageHandler(type, key, image)}
                />
                <Image
                    source={{uri: image.uri}}
                    style={styles.postThumbnail}
                />
            </View>
        )
    });
};

const styles = StyleSheet.create({
    postThumbnail: {
        width: 100,
        height: 100,
        marginTop: 10,
        marginBottom: 10,
    },
});

export default PostImages;