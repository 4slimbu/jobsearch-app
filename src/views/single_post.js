import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';
import {Button, Divider, Image} from "react-native-elements";

class SinglePost extends Component {
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
                        <Text style={styles.heading}>Post Title</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                                <Button title="Save" buttonStyle={{marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                        buttonSize={5}/>
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                                <Image source={require('../../assets/images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postAuthorMeta}>Firstname Lastname</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <Text style={styles.postContent}>Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. </Text>
                                <Text style={styles.postContent}>Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. </Text>
                                <Text style={styles.postContent}>Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                    consectetur adipiscing elit. Pellentesque
                                    venenatis condimentum turpis sit amet malesuada.
                                    Lorem ipsum dolor sit amet, ipsum dolor sit amet,
                                consectetur adipiscing elit. </Text>

                                <View>
                                    <Text style={styles.postTitle}>Comments</Text>
                                    <View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <Icon color={Colors.grey3} name='user' size={30} />
                                            <Text styles={{marginLeft: 100, color: Colors.grey3}}>Pellentesque
                                                venenatis condimentum turpis sit amet malesuada.</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <Icon color={Colors.grey4} name='long-arrow-right' size={20} />
                                            <Text styles={{marginLeft: 100, color: Colors.grey3}}>Pellentesque
                                                venenatis condimentum turpis sit amet malesuada.</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <Icon color={Colors.grey3} name='user' size={30} />
                                            <Text styles={{marginLeft: 100, color: Colors.grey3}}>Pellentesque
                                                venenatis condimentum turpis sit amet malesuada.</Text>
                                        </View>
                                        <View style={{flexDirection: 'row', marginBottom: 15}}>
                                            <Icon color={Colors.grey4} name='long-arrow-right' size={20} />
                                            <Text styles={{marginLeft: 100, color: Colors.grey3}}>Pellentesque
                                                venenatis condimentum turpis sit amet malesuada.</Text>
                                        </View>
                                    </View>
                                </View>

                                <View>
                                    <Text style={styles.postTitle}>Leave a Comment</Text>
                                    <View>
                                        <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                            multiline = {true}
                                            numberOfLines = {4}
                                        />

                                        <Button title="Comment" buttonStyle={{marginTop: 10, marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                                buttonSize={5}/>

                                    </View>
                                </View>

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
        marginBottom: 15,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 15
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default SinglePost;
