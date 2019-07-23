import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from "react-redux";

class ModalScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View><Text>Modal</Text></View>
        );
    }
}


const mapStateToProps = state => {
    return {}
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalScreen);