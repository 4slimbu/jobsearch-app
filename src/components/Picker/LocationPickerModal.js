import React, {Component} from 'react';
import globalStyles from "../../constants/globalStyle";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import {ScrollView, StyleSheet} from 'react-native';
import {SearchBar,} from 'react-native-elements';

import Colors from "../../constants/colors";
import LocationList from "../../components/List/LocationList";
import appData from "../../constants/app";
import ApiService from "../../services/ApiService";

class LocationPickerModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            searchText: "",
            predictions: [{}],
            location: null,
            isChanged: false,
            setTimeoutId: 0
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectPlace = this.onSelectPlace.bind(this);
        this.onPickMyLocation = this.onPickMyLocation.bind(this);
    }


    onChange(searchText) {
        this.setState({searchText: searchText, isChanged: true});

        if (searchText.length === 0) {
            // this.props.resetSearchedPosts();
        }

        if (searchText.length < 3) {
            return;
        }

        // Clear setTimeoutId if field changes and populate new one
        clearTimeout(this.state.setTimeoutId);

        // Call action only after few milli seconds
        this.setState({isLoading: true});
        let setTimeoutId = setTimeout(() => {
            ApiService.GoogleApis.searchLocation(searchText)
                .then(parsedRes => {
                    if (!parsedRes.predictions) {
                        return;
                    }

                    this.setState({
                        predictions: parsedRes.predictions
                    })
                })
                .catch(err => {
                });

            // Stop Loading
            this.setState({ isLoading: false });
        }, 300);

        this.setState({setTimeoutId: setTimeoutId});

    }

    onSelectPlace(location) {
        ApiService.GoogleApis.geocodeAddress(location.description)
            .then(parsedRes => {
                if (!parsedRes.results) {
                    return;
                }

                this.setState({
                    location: {
                        address: parsedRes.results[0].formatted_address,
                        latAndLong: parsedRes.results[0].geometry.location
                    },
                    searchText: parsedRes.results[0].formatted_address,
                    isChanged: false
                });

                this.props.onPickLocation({
                    address: parsedRes.results[0].formatted_address,
                    latitude: parsedRes.results[0].geometry.location.lat,
                    longitude: parsedRes.results[0].geometry.location.lng,
                });
            })
            .catch(err => {
            });
    }

    async onPickMyLocation() {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});

        // Get address
        ApiService.GoogleApis.reverseGeocodeAddress(location.coords.latitude, location.coords.longitude)
            .then(parsedRes => {
                if (!parsedRes.results) {
                    return;
                }

                this.setState({
                    location: {
                        address: parsedRes.results[0].formatted_address,
                        latAndLong: parsedRes.results[0].geometry.location
                    },
                    searchText: parsedRes.results[0].formatted_address,
                    isChanged: false
                });

                this.props.onPickLocation({
                    address: parsedRes.results[0].formatted_address,
                    latitude: parsedRes.results[0].geometry.location.lat,
                    longitude: parsedRes.results[0].geometry.location.lng,
                });
            })
            .catch(err => {
            });
    }


    render() {
        const {address} = this.props.location;
        const {searchText, isLoading, isChanged} = this.state;
        return (
            <ScrollView style={globalStyles.scrollViewContainer}>
                <SearchBar
                    lightTheme
                    containerStyle={{backgroundColor: Colors.lightGray, borderWidth: 0}}
                    inputContainerStyle={{backgroundColor: Colors.mediumGray, borderWidth: 0, marginTop: 5}}
                    inputStyle={{marginTop: 6}}
                    placeholder="Search city, suburb or town"
                    showLoading={isLoading}
                    value={isChanged ? searchText : address}
                    multiline={true}
                    onChangeText={searchText => this.onChange(searchText)}
                />
                <ScrollView style={{marginTop: 20}}>
                    <LocationList locations={this.state.predictions} onSelect={this.onSelectPlace} onPickMyLocation={this.onPickMyLocation}/>
                </ScrollView>
            </ScrollView>
        );
    }
}

export default LocationPickerModal;
