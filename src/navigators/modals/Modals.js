import React from 'react';
import {createStackNavigator} from 'react-navigation';
import PickLocationModal from "../../screens/Modal/PickLocationModal";
import FilterModal from "../../screens/Modal/FilterModal";
import CategoryPickModal from "../../screens/Modal/CategoryPickModal";
import withCustomNav from "../../components/HOC/withCustomNav";

const Modals = createStackNavigator({
    PickLocationModal: { screen: withCustomNav(PickLocationModal) },
    FilterModal: { screen: withCustomNav(FilterModal) },
    CategoryPickModal: { screen: withCustomNav(CategoryPickModal) }
},{
    mode: 'modal',
    // headerMode: 'none'
});

export default Modals;
