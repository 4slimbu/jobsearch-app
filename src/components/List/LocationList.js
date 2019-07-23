import React from "react";
import {StyleSheet, View, Text, TouchableOpacity} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import LocationItem from "../ListItem/LocationItem";

const LocationListView = (props) => {
    const {locations, onSelect} = props;

    return map(locations, (location, key) => {
        return (
            <TouchableOpacity key={key} onPress={() => onSelect(location)} style={{width: '100%'}}>
                <LocationItem
                    key={key}
                    isFirst={key === 0}
                    location={location}
                />
            </TouchableOpacity>
        )
    });
};

const LocationList = props => {
    const {locations, onSelect, onPickMyLocation} = props;
    const locationListProps = {
        locations: locations,
        onSelect: onSelect,
    };
    return (
        <View style={styles.locationContainer}>
            <TouchableOpacity onPress={() => onPickMyLocation()} style={{width: '100%'}}>
                <View style={{width: '100%'}}>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 5, width: '100%'}}>
                        <Text>Pick My Current Location</Text>
                    </View>
                </View>
            </TouchableOpacity>
            <LocationListView {...locationListProps}/>
        </View>
    );
};

const styles = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 5,
    },
});

LocationList.propTypes = {
    locations: PropTypes.array.isRequired,
};

export default LocationList;
