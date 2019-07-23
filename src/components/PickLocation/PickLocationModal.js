import React, {Component} from 'react';
import {Constants, Location, Permissions} from "expo";
import {ScrollView, StyleSheet, View} from 'react-native';
import {SearchBar,} from 'react-native-elements';

import Colors from "../../constants/colors";
import {connect} from "react-redux";
import {resetSearchedPosts, searchPosts} from "../../store/actions/postActions";
import {authUpdatePreferences} from "../../store/actions/authActions";
import ContentLoading from "../../components/ContentLoading";
import LocationList from "../List/LocationList";

class PickLocationModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            searchText: "",
            predictions: [{}],
            location: null
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectPlace = this.onSelectPlace.bind(this);
        this.onPickMyLocation = this.onPickMyLocation.bind(this);
    }

    onChange(searchText) {
        this.setState({searchText});

        if (searchText.length === 0) {
            // this.props.resetSearchedPosts();
        }

        if (searchText.length < 3) {
            return;
        }

        // Check if state is loading, then do nothing
        if (!this.state.isLoading) {
            // Initiate loading
            this.setState({ isLoading: true });

            // Call action only after few milli seconds
            setTimeout(() => {
                fetch("https://maps.googleapis.com/maps/api/place/autocomplete/json?&input=" + searchText + "&key=AIzaSyBsLWTX7nI81gitMCcVrBZuRRNd49zQqj8", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    }
                })
                    .then(res => res.json())
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
            }, 500);
        }
    }

    onSelectPlace(location) {
        fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + location.description + "&key=AIzaSyBsLWTX7nI81gitMCcVrBZuRRNd49zQqj8", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            }
        })
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.results) {
                    return;
                }

                this.setState({
                    location: {
                        address: parsedRes.results[0].formatted_address,
                        latAndLong: parsedRes.results[0].geometry.location
                    },
                    searchText: parsedRes.results[0].formatted_address
                })
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
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + location.coords.latitude + ',' + location.coords.longitude + '&key=AIzaSyBsLWTX7nI81gitMCcVrBZuRRNd49zQqj8')
            .then(res => res.json())
            .then(parsedRes => {
                if (!parsedRes.results) {
                    return;
                }

                this.setState({
                    location: {
                        address: parsedRes.results[0].formatted_address,
                        latAndLong: parsedRes.results[0].geometry.location
                    },
                    searchText: parsedRes.results[0].formatted_address
                })
            })
            .catch(err => {
            });
    }


    render() {
        const {searchText, isLoading} = this.state;
        return (
            <ScrollView style={styles.container}>
                <SearchBar lightTheme placeholder="Search Location"
                           showLoading={isLoading}
                           value={searchText}
                           onChangeText={searchText => this.onChange(searchText)}
                />

                <ScrollView style={{marginTop: 20}}>
                    <LocationList locations={this.state.predictions} onSelect={this.onSelectPlace} onPickMyLocation={this.onPickMyLocation}/>
                </ScrollView>

                <View style={{height: 100}}>
                    {
                        isLoading && <ContentLoading/>
                    }
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        marginTop: Constants.statusBarHeight
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#acacac',
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
    contentView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    triangleLeft: {
        position: 'absolute',
        left: -20,
        bottom: 0,
        width: 0,
        height: 0,
        borderRightWidth: 20,
        borderRightColor: 'white',
        borderBottomWidth: 25,
        borderBottomColor: 'transparent',
        borderTopWidth: 25,
        borderTopColor: 'transparent',
    },
    triangleRight: {
        position: 'absolute',
        right: -20,
        top: 0,
        width: 0,
        height: 0,
        borderLeftWidth: 20,
        borderLeftColor: 'white',
        borderBottomWidth: 25,
        borderBottomColor: 'transparent',
        borderTopWidth: 25,
        borderTopColor: 'transparent',
    },
    inputContainerStyle: {
        marginTop: 16,
        width: '90%',
    },
    searchBar: {
        backgroundColor: Colors.grey5
    }
});

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        searchedPosts: state.posts.searchedPosts
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdatePreferences: (preferences) => dispatch(authUpdatePreferences(preferences)),
        onSearch: (text, url) => dispatch(searchPosts(text, url)),
        resetSearchedPosts: () => dispatch(resetSearchedPosts()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PickLocationModal);
