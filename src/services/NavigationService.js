import {NavigationActions} from 'react-navigation';
import store from "../store/configureStore";
import {uiPopItemFromViewHistory} from "../store/actions/uiActions";

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function getCurrentRoute() {
    let route = _navigator.state.nav;
    while (route.routes) {
        route = route.routes[route.index];
    }

    return route;
}

function navigate(routeName, params) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        })
    );
}

function navigateBack() {
    store.dispatch(uiPopItemFromViewHistory());

    let viewHistory = store.getState().ui.viewHistory;
    if (viewHistory.length > 0) {
        _navigator.dispatch(
            NavigationActions.navigate(viewHistory[viewHistory.length - 1])
        );
    }
}

// add other navigation functions that you need and export them

export default {
    navigate,
    getCurrentRoute,
    setTopLevelNavigator,
    navigateBack
};