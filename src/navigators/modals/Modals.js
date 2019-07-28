import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PickLocationModal from "../../screens/Modal/PickLocationModal";
import FilterModal from "../../screens/Modal/FilterModal";

const Modals = createStackNavigator({
    PickLocationModal: { screen: PickLocationModal },
    FilterModal: { screen: FilterModal }
},{
    mode: 'modal',
    // headerMode: 'none'
});

export default Modals;
