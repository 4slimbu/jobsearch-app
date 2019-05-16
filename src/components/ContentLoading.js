import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from "../constants/colors";

const ContentLoading = props => {
    return (
        <ActivityIndicator size="large" color={Colors.primary} style={{marginTop: 50, marginBottom: 50}}/>
    )
};

export default ContentLoading;