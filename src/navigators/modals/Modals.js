import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ModalExample from "../../screens/Modals/ModalExample";

const Modals = createStackNavigator({
    ModalExample: { screen: ModalExample },
},{
    mode: 'modal',
    // headerMode: 'none'
});

export default Modals;
