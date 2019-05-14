import React from 'react';
import {ActivityIndicator} from 'react-native';
import Colors from "../constants/colors";

const ContentLoading = props => {
    return (
        <ActivityIndicator size="large" color={Colors.primary} style={{marginTop: 100}}/>
    )
};

export default ContentLoading;