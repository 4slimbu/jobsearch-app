import React from 'react';
import {View, Text} from 'react-native';
import {connect} from "react-redux";
import {authLogout} from "../../store/actions";

class Logout extends React.Component {
  async componentDidMount() {
    await this.props.onAuthLogout();
    this.props.navigation.navigate('Auth');
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
    onAuthLogout: dispatch(authLogout)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);