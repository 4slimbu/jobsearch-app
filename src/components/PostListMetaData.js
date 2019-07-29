import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/colors";
import NavigationService from "../services/NavigationService";

const PostListMetaData = props => {
    const {meta, backScreen, isFilterActive, onRefresh} = props;
    return (
        meta && meta.current_page ?
        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: 30, marginRight: 30, marginTop: 20}}>
            <View style={{flex: 4}}>
                {
                    meta.total > 0 ?
                        <Text>Showing 1 - {meta.to} of {meta.total}</Text>
                        :
                        <Text>No Posts</Text>
                }
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={() => NavigationService.navigate('FilterModal', {backScreen: backScreen, onRefresh: onRefresh})}>
                    <Icon style={[styles.filter, isFilterActive && styles.active]} name="sliders"/>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
                <TouchableOpacity onPress={onRefresh}>
                    <Icon style={styles.refresh} name="refresh"/>
                </TouchableOpacity>
            </View>
        </View> :
        <View></View>
    )
};

const styles = StyleSheet.create({
    refresh: {
        color: Colors.grey3,
        fontSize:40,
        textAlign: "right"
    },
    filter: {
        color: Colors.grey3,
        fontSize:40,
        textAlign: "right"
    },
    active: {
        color: Colors.primary
    }

});


export default PostListMetaData;