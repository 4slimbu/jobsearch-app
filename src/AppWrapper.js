import React, {Component, Fragment} from 'react';
import {createAppContainer} from "react-navigation";
import MainNavigator from "./navigators/MainNavigator";
import ContentLoading from "./components/ContentLoading";


const AppContainerWithNavigator = createAppContainer(MainNavigator);

class AppWrapper extends Component {
    render() {
        return (
            <Fragment>
                <AppContainerWithNavigator/>
                <ContentLoading/>
            </Fragment>
        )
    }
}

export default AppWrapper;