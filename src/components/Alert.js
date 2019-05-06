import React from 'react';
import { Alert } from 'react-native';

const alertMessage = props => {
    const {title, body} = props;
    return (
        Alert.alert(
            title,
            body,
            [
                {text: 'OK'},
            ],
        )
    )
};

export default alertMessage;