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

    btnPrimaryContainer: {
        marginTop: 32, 
        flex: 1,
    },
    
    btnPrimary: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        height: 40,
    },

    btnPrimaryTitle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },

    btnPrimaryOutline: {
        alignItems: 'center',
        borderColor: Colors.primary,
        borderRadius: 5,
        borderWidth: 1,
        backgroundColor: 'transparent',
        color: Colors.primary,
    },

    btnPrimaryOutlineTitle: {
        padding: 7,
        color: Colors.primary,
    },

    btnSecondary: {
        backgroundColor: Colors.mediumGray,
        borderRadius: 5,
        height: 40,
    },

    btnSecondaryOutline: {
        maxWidth: 150,
        alignItems: 'center',
        borderColor: Colors.mediumGray,
        borderRadius: 5,
        borderWidth: 1,
    },

    btnSecondaryOutlineTitle: {
        padding: 7,
        color: Colors.mediumGray,
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

    formTitle: {
        color: Colors.darkGray,
        marginTop: 5,
        marginBottom: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    
    formRow: {
        marginBottom: 15,
    },

    textInput: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: Colors.greyOutline,
        height: 44,
        padding: 4,
    },

    textArea: {
        borderWidth: 1,
        borderColor: Colors.greyOutline,
        minHeight:104,
        borderRadius: 5,
        backgroundColor: Colors.lightGray,
        padding: 5,
        paddingVertical: 5,
        marginBottom: 0,
    },

    textAreaLight: {
        borderWidth: 1,
        borderColor: Colors.greyOutline,
        minHeight:104,
        borderRadius: 5,
        backgroundColor: 'white',
        padding: 5,
        paddingVertical: 5,
        marginBottom: 0,
    },

    scrollViewContainer: {
        backgroundColor: 'white',
    },

    scrollViewContentView: {
        flex: 1,
    },

    headerContainer: {
        padding: 10,
        marginBottom: 20,
        backgroundColor: Colors.lightGray,
        flex: 1,
        alignItems: "center",
    },

    heading: {
        color: Colors.darkGray,
        fontSize: 18,
        fontWeight: 'bold',
    },

    error: {
        color: Colors.danger,
        marginTop: 5,
        fontSize: 12,
    }
});