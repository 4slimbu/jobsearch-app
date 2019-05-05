import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';

class PageDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>Page Title</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
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
        padding: 40,
        paddingLeft: 20,
        paddingRight: 20,
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

export default PageDetailScreen;