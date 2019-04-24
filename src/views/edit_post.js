import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';
import {Button, Divider, Image} from "react-native-elements";

class EditPost extends Component {
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
                        <Text style={styles.heading}>Edit Post</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={styles.postTitle}>Post Title</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3, paddingLeft: 15, paddingRight: 15}} value="My Post Title"/>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Post Content</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3, paddingLeft: 15, paddingRight: 15}}
                                           multiline = {true}
                                           numberOfLines = {15}
                                           value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi a massa tempor, ullamcorper nibh non, feugiat sem. Curabitur semper et ligula ac maximus. Vivamus ultricies orci vel odio porta, eget imperdiet leo pellentesque. Vestibulum odio lectus, mattis eu rutrum vel, fermentum eu erat. Aliquam quis aliquet magna. Vivamus pulvinar at ipsum non tincidunt. Aliquam rhoncus pellentesque metus vel fringilla. Maecenas rhoncus dui vel leo elementum, et eleifend est volutpat. Suspendisse potenti. Donec eu erat eu libero placerat lacinia. Cras convallis bibendum est ac ullamcorper. Proin non libero consequat turpis tincidunt pretium in quis leo. Fusce sagittis eu tellus quis rhoncus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit quam sed odio congue posuere."
                                />

                            </View>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Featured Image</Text>
                            <View>
                                <View>
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                </View>
                                <Button title="Upload Image" buttonStyle={{marginTop: 10, marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                        buttonSize={5} type="outline"/>

                            </View>
                        </View>

                        <View>
                            <Text style={styles.postTitle}>Additional Images</Text>
                            <View>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                    <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                           style={{width: 50, height: 100, marginBottom: 5}}
                                           PlaceholderContent={<ActivityIndicator/>}
                                    />
                                </View>
                                <Button title="Upload Image" buttonStyle={{marginTop: 10, marginBottom: 5, paddingTop: 5, paddingBottom: 5}}
                                        buttonSize={5} type="outline"/>

                            </View>
                        </View>

                        <Button title="Save" buttonStyle={{marginTop: 25, marginBottom: 50}}
                                buttonSize={5}/>

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
        padding: 40,
        paddingLeft: 20,
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

export default EditPost;
