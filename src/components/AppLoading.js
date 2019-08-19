import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

class AppLoading extends Component {
    render() {
        const {isLoading} = this.props.ui;
        return (
            <View>
                <Spinner visible={isLoading}/>
            </View>
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