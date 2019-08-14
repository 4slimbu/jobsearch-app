import React, {Component} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import Colors from "../../constants/colors";
import LocationPickerModal from "./LocationPickerModal";

class LocationPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            location: {
                address: "",
                latitude: "",
                longitude: ""
            },
            isLocationUpdated: false,
        };

        this.cancelHandler = this.cancelHandler.bind(this);
        this.doneHandler = this.doneHandler.bind(this);
        this.pickLocationHandler = this.pickLocationHandler.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            location: this.props.location,
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    reset() {
        this.setState({
            isVisible: false,
            location: {
                address: "",
                latitude: "",
                longitude: ""
            },
            isLocationUpdated: false,
        })
    }

    cancelHandler() {
        this.reset();
    }

    doneHandler() {
        this.props.onChange(this.state.location);
        this.reset();
    }

    pickLocationHandler(location) {
        this.setState({isLocationUpdated: true, location: location});
    }

    render() {
        const {isLocationUpdated} = this.state;
        const {location} = this.props;
        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({isVisible: true})}>
                    <View style={styles.locationPicker}>
                        <FontAwesome
                            name="map-marker"
                            color={Colors.primary}
                            size={45}
                        />
                        <Text style={location ? styles.locationTitleActive : styles.locationTitle}>{ location ? location: 'Select Location' }</Text>
                    </View>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.isVisible}
                    >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <LocationPickerModal location={this.state.location} onPickLocation={this.pickLocationHandler}/>
                            <View style={{height: 54, flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity style={styles.button} onPress={this.cancelHandler}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                {
                                    isLocationUpdated ?
                                        <TouchableOpacity style={[styles.button]} onPress={this.doneHandler}>
                                            <Text>Done</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.button}><Text style={styles.dullText}>Done</Text></View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
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

    button: {
        flex: 1/2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        margin: 2
    },

    dullText: {
        color: Colors.mediumGray
    }
});

export default LocationPicker;