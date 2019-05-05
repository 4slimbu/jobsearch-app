import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ModalScreen from "../../screens/Modal/ModalScreen";

const Modals = createStackNavigator({
    Modal: { screen: ModalScreen }
},{
    mode: 'modal',
    headerMode: 'none'
});

export default Modals;
