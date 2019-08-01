import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PickLocationModal from "../../screens/Modal/PickLocationModal";
import FilterModal from "../../screens/Modal/FilterModal";
import CategoryPickModal from "../../screens/Modal/CategoryPickModal";

const Modals = createStackNavigator({
    PickLocationModal: { screen: PickLocationModal },
    FilterModal: { screen: FilterModal },
    CategoryPickModal: { screen: CategoryPickModal }
},{
    mode: 'modal',
    // headerMode: 'none'
});

export default Modals;
