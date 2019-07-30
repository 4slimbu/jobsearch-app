import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/colors";
import NavigationService from "../services/NavigationService";

const PostListMetaData = props => {
    const {meta, backScreen, isFilterActive, onRefresh} = props;
    return (
        meta && meta.current_page ?
        <View style={styles.postsListHeader}>
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
            {/* <View style={{flex: 1}}>
                <TouchableOpacity onPress={onRefresh}>
                    <Icon style={styles.refresh} name="refresh"/>
                </TouchableOpacity>
            </View> */}
        </View> :
        <View></View>
    )
};

const styles = StyleSheet.create({
    postsListHeader: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        color: Colors.darkGray,
    },

    refresh: {
        color: Colors.darkGray,
        fontSize: 22,
        textAlign: "right"
    },

    filter: {
        color: Colors.darkGray,
        fontSize: 22,
        textAlign: "right"
    },

    active: {
        color: Colors.primary
    }

});


export default PostListMetaData;