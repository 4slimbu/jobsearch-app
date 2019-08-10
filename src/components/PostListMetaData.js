import React, {Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../constants/colors";
import NavigationService from "../services/NavigationService";
import {humanReadableFilterInfo} from "../utils/helper/helper";

const PostListMetaData = props => {
    const {meta, backScreen, isFilterActive, filter, onRefresh} = props;
    return (
        <Fragment>
            {
                meta && meta.current_page &&
                    <View style={styles.postsListHeader}>
                        <View style={{flex: 4}}>
                            <Text>{ meta && filter && humanReadableFilterInfo(meta, filter) }</Text>
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
                    </View>
            }
        </Fragment>
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