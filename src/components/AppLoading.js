import React, {Component} from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import Colors from "../constants/colors";
import {connect} from "react-redux";

class AppLoading extends Component {
    render() {
        const {isLoading} = this.props.ui;
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={isLoading}
            >
                <ActivityIndicator size="large" color={Colors.primary} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}/>
            </Modal>

        )
    }
};

const mapStateToProps = state => {
    return {
        ui: state.ui
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLoading);