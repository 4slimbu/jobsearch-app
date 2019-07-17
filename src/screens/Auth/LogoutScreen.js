import React from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import {authLogout} from "../../store/actions/authActions";

class LogoutScreen extends React.Component {
    async componentDidMount() {
        await this.props.onAuthLogout().then((res) => {
            this.props.navigation.navigate('Auth');
        }).catch(err => {
        });
    }

    render() {
        return (
            <View><Text>Logout</Text></View>
        );
    }
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuthLogout: async() => await dispatch(authLogout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen);