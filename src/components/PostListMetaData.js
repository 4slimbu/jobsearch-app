import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Colors from "../constants/colors";
import {humanReadableFilterInfo} from "../utils/helper/helper";
import Filter from "./Filter";

const PostListMetaData = props => {
    const {meta, filter, onFilterUpdate} = props;

    const filterProps = {
        filter: filter,
        onFilterUpdate: onFilterUpdate
    };

    return (
        <Fragment>
            {
                meta && meta.current_page &&
                    <View style={styles.postsListHeader}>
                        <View style={{flex: 4}}>
                            <Text>{ meta && filter && humanReadableFilterInfo(meta, filter) }</Text>
                        </View>
                        <View style={{flex: 1}}>
                            <Filter {...filterProps}/>
                        </View>
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