import React from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import Colors from "../constants/colors";
import {connect} from "react-redux";

const AppLoading = props => {
    const {isLoading} = props;
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isLoading}
            >
            <ActivityIndicator size="large" color={Colors.primary} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
        </Modal>

    )
};

export default AppLoading;