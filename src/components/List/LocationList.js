import React, {PureComponent} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
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

class LocationList extends PureComponent {
    render() {
        const {locations, onSelect, onPickMyLocation} = this.props;
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
    }
}

const styles = StyleSheet.create({
    locationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 5,
    },
});

export default LocationList;
