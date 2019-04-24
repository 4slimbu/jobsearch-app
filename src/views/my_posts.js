import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/colors';
import {Button, Divider, Image} from "react-native-elements";

class MyPosts extends Component {
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
                        <Text style={styles.heading}>My Posts</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
                                </View>

                            </View>
                        </View>
                    </View>

                    <Divider style={{backgroundColor: Colors.grey3}}/>

                    <View style={{paddingLeft: 20, paddingRight: 20, marginTop: 20, marginBottom: 20}}>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={{flex: 1, marginRight: 15}}>
                                <Image source={require('./../images/placeholder.png')} resizeMode={'contain'}
                                       style={{width: '100%', height: 100, marginBottom: 5}}
                                       PlaceholderContent={<ActivityIndicator/>}
                                />
                            </View>
                            <View style={{flex: 3}}>
                                <Text style={styles.postTitle}>Post Title</Text>
                                <Text style={styles.postDateMeta}>Yesterday at 5pm | 10 Comments</Text>
                                <View style={{flexDirection: 'row'}}>
                                    <Button title="Edit" onPress={()=> this.props.navigation.navigate('EditPost')} buttonStyle={{marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100, marginRight: 10}}
                                            buttonSize={5}/>
                                    <Button title="Delete" buttonStyle={{backgroundColor: 'darkred', marginBottom: 5, paddingTop: 3, paddingBottom: 3, width: 100}}
                                            buttonSize={5}/>
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

export default MyPosts;
