import React from 'react';
import { Platform, Alert, AlertIOS } from 'react-native';

const flashMessage = props => {
    const {title, body} = props;
    return (
        Platform.OS === 'ios' ?
            AlertIOS.alert(
                title,
                body,
                [
                    {text: 'OK'},
                ],
            )
            :
            Alert.alert(
                title,
                body,
                [
                    {text: 'OK'},
                ],
            )

    )
};

export default flashMessage;