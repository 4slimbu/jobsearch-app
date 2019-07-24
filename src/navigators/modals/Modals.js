import React from 'react';
import {createStackNavigator} from 'react-navigation';
import ModalScreen from "../../screens/Modal/ModalScreen";
import PickLocationModal from "../../screens/Modal/PickLocationModal";

const Modals = createStackNavigator({
    PickLocationModal: { screen: PickLocationModal },
    Modal: { screen: ModalScreen }
},{
    mode: 'modal',
    // headerMode: 'none'
});

export default Modals;
