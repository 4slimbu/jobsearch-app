import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';
import {Button, Divider, Image} from "react-native-elements";

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            selectedIndexes: [0, 2, 3],
        };
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton() {
        // this.props.navigation.navigate('Categories');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Profile</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <View >
                            <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                   style={{width: '100%', height: 100, marginBottom: 5}}
                                   PlaceholderContent={<ActivityIndicator/>}
                            />
                        </View>
                        <View >
                            <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 20}}>
                                <Button title="Update Profile Picture" buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, marginRight: 10}}
                                        buttonSize={5}/>
                                <Button title="Update Profile" buttonStyle={{ marginBottom: 5, paddingTop: 3, paddingBottom: 3}}
                                        buttonSize={5}/>
                            </View>

                        </View>

                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>First Name</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>Lorem</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Last Name</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>Ipsum</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Email</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>email@gmail.com</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Password</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Button title="Update password" buttonStyle={{ backgroundColor: 'darkred',  marginBottom: 5, paddingTop: 3, paddingBottom: 3}}
                                        buttonSize={5}/>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Gender</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>Male</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Phone No.</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>977 9983829382</Text>
                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 2, marginRight: 15}}>
                                <Text style={styles.postTitle}>Address</Text>
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postContent}>Address Line</Text>
                                <Text style={styles.postContent}>City, State, Country</Text>
                            </View>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: '#4F80E1',
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
        paddingBottom: 30
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    postTitle: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default MyProfile;
