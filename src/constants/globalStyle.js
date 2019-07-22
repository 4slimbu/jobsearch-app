import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Colors from "./colors";
import appData from "./app";

module.exports = StyleSheet.create({
    inputContainerStyle: {
        borderColor: Colors.greyOutline,
        borderWidth: 1,
        borderRadius: 4,
    },
    inputViewContainer: {
        marginTop: 7,
    },
    inputStyle: {
        marginLeft: 10,
        color:Colors.grey1,
    },

    btnPrimary: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        height: 40,
        width:  appData.app.SCREEN_WIDTH - 75,
    },
    btnPrimaryContainer: {
        marginTop: 32, 
        flex: 1,
    },
    btnPrimaryTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    btnLink: {
        backgroundColor:'transparent',
        borderRadius:0,
        marginLeft:55,
    },
    btnLinkRight: {
        marginLeft:0,
    },
    btnLinkTitle: {
        color: Colors.grey1,
        fontSize: 14,
    },

    inputIcon: {
        backgroundColor:'transparent',
        fontSize:18,
    },

    textNote: {
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 17,
        textAlign: 'center',
        color: Colors.grey1,
    },
});