import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Colors from "../../constants/colors";

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
        const {value, navigation, backScreen} = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('PickLocationModal',
            {backScreen: backScreen})}>
                <View style={styles.locationPicker}>
                    <FontAwesome
                        name="map-marker"
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
        width: '100%',
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