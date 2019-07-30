import React from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";
import Colors from "../../constants/colors";
import {Divider} from "react-native-elements";
import {toReadable} from "../../utils/helper/helper";

const LocationItem = props => {
    const {location, isFirst} = props;
    return (
        <View style={{width: '100%'}}>
            <Divider style={styles.divider}/>
            <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 5, width: '100%'}}>
                <Text style={styles.content}>{location.description}</Text>
            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    divider: {
        backgroundColor: Colors.darkGray,
        marginTop: 20,
        marginBottom: 20
    },
    content: {
        color: Colors.darkGray,
        fontSize: 16,
        lineHeight: 20
    },
});

LocationItem.propTypes = {
    isFirst: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
};

export default LocationItem;
