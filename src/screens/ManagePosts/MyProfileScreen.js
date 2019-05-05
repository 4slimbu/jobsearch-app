import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {Button, Divider, Image} from "react-native-elements/src/index";
import {getMyPosts} from "../../store/actions/postActions";
import {connect} from "react-redux";
import * as _ from "../../components/ListItem/PostItem";

class MyProfileScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {user} = this.props.auth;
        const profilePicture = user.profile_pic ? {uri: user.profile_pic} : require('../../../assets/images/placeholder.png');
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>My Profile</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <View >
                            <Image source={profilePicture} resizeMode={'contain'}
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
                                <Text style={styles.postContent}>{user.first_name}</Text>
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
                                <Text style={styles.postContent}>{user.last_name}</Text>
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
                                <Text style={styles.postContent}>{user.email}</Text>
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
                                <Text style={styles.postContent}>{user.gender}</Text>
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
                                <Text style={styles.postContent}>{user.contact_number}</Text>
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

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyProfileScreen);
