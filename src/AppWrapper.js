import React, {Component, Fragment} from 'react';
import {createAppContainer} from "react-navigation";
import MainNavigator from "./navigators/MainNavigator";
import {connect} from "react-redux";
import AppLoading from "./components/AppLoading";


const AppContainerWithNavigator = createAppContainer(MainNavigator);

class AppWrapper extends Component {
    render() {
        const {isLoading} = this.props.ui;
        return (
            <Fragment>
                <AppContainerWithNavigator/>
                <AppLoading isLoading={isLoading}/>
            </Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
        ui: state.ui
    }
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);