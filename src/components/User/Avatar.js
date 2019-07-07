import React from "react";
import {StyleSheet, Text, View} from "react-native";

const Avatar = props => {
    const {user} = props;
    console.log(user);
    return (
        <View style={{width: '100%'}}>
            <Text>Avatar</Text>
        </View>
    )
};

const styles = StyleSheet.create({
});

export default Avatar;
