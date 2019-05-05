import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Colors from '../../constants/colors';
import {Button, Image} from "react-native-elements/src/index";
import {ImagePicker} from "expo";

class AddPostScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: null,
        };
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            base64: true
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }
    };

    render() {
        const {image} = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Add Post</Text>
                    </View>
                    <View style={{marginLeft: 20, marginRight: 20}}>
                        <View>
                            <Text style={styles.postTitle}>Post Title</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}/>
                            </View>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Post Content</Text>
                            <View>
                                <TextInput style={{borderWidth: 1, borderColor: Colors.grey3}}
                                           multiline = {true}
                                           numberOfLines = {15}
                                />

                            </View>
                        </View>
                        <View>
                            <Text style={styles.postTitle}>Featured Image</Text>
                            <View>
                                {image &&
                                <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10, marginBottom: 10}} />}
                                <Button
                                    title="Pick an image from camera roll"
                                    onPress={this._pickImage}
                                />
                            </View>
                        </View>

                        <View>
                            <Text style={styles.postTitle}>Additional Images</Text>
                            <View>
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
        backgroundColor: Colors.primary1,
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

export default AddPostScreen;
