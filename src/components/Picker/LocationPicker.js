import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../constants/colors";
import appData from "../../constants/app";

class PickLocation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {value, errorMessage, navigation, backScreen} = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('PickLocationModal',
            {backScreen: backScreen})}>
                <View style={styles.locationPicker}>
                    <Icon
                        name="map-marker"
                        type="font-awesome"
                        color={Colors.primary}
                        size={45}
                    />
                    <Text style={value ? styles.locationTitleActive : styles.locationTitle}>{ value ? value: 'Select Location' }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
   
    locationPicker: {
        flex: 1,
        borderColor: Colors.greyOutline,
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
    },

    locationTitle: {
        color: Colors.mediumGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },

    locationTitleActive: {
        color: Colors.darkGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },
});

export default PickLocation;