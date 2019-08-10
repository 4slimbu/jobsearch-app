import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Colors from "./colors";

module.exports = StyleSheet.create({
    innerLogo: {
        marginLeft: 10,
        width: 40,
        height: 40,
    },

    keyboardAvoidingView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100,
        marginBottom: 100,
    },

    inputOuterContainerStyle: {
        paddingLeft: 0,
    },

    inputContainerStyle: {
        width: '100%',
        borderColor: Colors.greyOutline,
        borderRadius: 4,
        borderWidth: 1,
    },

    inputStyle: {
        paddingLeft: 10,
        color:Colors.darkGray,
    },

    inputViewContainer: {
        marginTop: 7,
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
        backgroundColor: 'transparent',
        borderRadius: 0,
        marginLeft: 0,
    },
    btnLinkRight: {
        marginLeft:0,
    },
    btnLinkTitle: {
        color: Colors.darkGray,
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
        color: Colors.darkGray,
    },

    formTitle: {
        color: Colors.darkGray,
        marginTop: 0,
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'normal',
    },
    
    formRow: {
        width: '100%',
        marginBottom: 5,
    },

    formRowMarginBottom: {
        marginBottom: 20,
    },

    formFlexRow: {
        width: '100%',
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },

    formFlexColumn: {
        width: '100%',
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 10,
        paddingRight: 10,
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