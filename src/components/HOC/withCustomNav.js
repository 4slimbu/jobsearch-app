import React, {Component, Fragment} from 'react'
import {BackHandler} from "react-native";
import {connect} from "react-redux";

import {Ionicons, Feather} from "@expo/vector-icons";
import {DrawerActions} from "react-navigation";
import Colors from "../../constants/colors";
import {Image, TouchableOpacity} from "react-native";
import * as globalStyles from "../../constants/globalStyle";
import appData from "../../constants/app";
import {uiUpdateViewHistory} from "../../store/actions/uiActions";
import NavigationService from "../../services/NavigationService";

const withCustomNav = (PassedComponent) => {
    class WithCustomNav extends Component {
        static navigationOptions = ({navigation}) => {
            let navigationOptions = {};
            let showHeaderRight = true;
            let title = navigation.getParam('title');
            let backBehavior = navigation.getParam('backBehavior');

            // Set Title
            if (title) {
                navigationOptions.title = title;
            }

            // Set Header Left
            // By default, header left will have back icon and will take back to last visited route
            navigationOptions.headerLeft = (
                <TouchableOpacity
                    hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                    onPress={() => {
                        // If refresh callback is present, call it
                        let onRefresh = navigation.getParam('onRefresh');
                        if (onRefresh) {
                            navigation.state.params.onRefresh();
                        }

                        // Navigate back to previous route
                        NavigationService.navigateBack();
                    }}
                >
                    <Ionicons
                        name="ios-arrow-back"
                        size={30}
                        style={{marginLeft: 10}}
                    />
                </TouchableOpacity>
            );

            // If Back behavior is defined, will take to predefined routes. For now only HOME has been defined.
            if (backBehavior && backBehavior === 'HOME') {
                navigationOptions.headerLeft = (
                    <TouchableOpacity onPress={() => navigation.navigate(appData.routes.HOME)}>
                        <Image
                            style={globalStyles.innerLogo}
                            source={appData.app.LOGO_INNER_URL}
                        />
                    </TouchableOpacity>
                )
            }

            // Set Header Right
            if (navigation.state.params.isAuthenticated) {
                navigationOptions.headerRight = (
                    <Feather
                        name="bar-chart-2"
                        style={{marginRight: 10, transform: [{rotate: "-90deg"}]}}
                        size={32}
                        color={Colors.darkGray}
                        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    />
                );
            }

            return navigationOptions;
        };

        componentWillMount() {
            this.props.uiUpdateViewHistory(NavigationService.getCurrentRoute());
        }

        componentDidMount() {
            // Set auth state
            this.props.navigation.setParams({isAuthenticated: this.props.isAuthenticated});
            console.log({isAuthenticated: this.props.isAuthenticated});
            BackHandler.addEventListener('hardwareBackPress', this._onBackIconPress);
        }

        componentWillUnmount() {
            BackHandler.removeEventListener('hardwareBackPress', this._onBackIconPress);
        }

        _onBackIconPress = () => {
            // If refresh callback is present, call it
            let onRefresh = this.props.navigation.getParam('onRefresh');
            if (onRefresh) {
                this.props.navigation.state.params.onRefresh();
            }

            // Navigate back to previous route
            NavigationService.navigateBack();
            return true;
        };

        render() {
            return (
                <Fragment>

                    {/*-------------Start: Passed Component---------------*/}
                    <PassedComponent
                        {...this.props}
                    />
                    {/*-------------End: Passed Component---------------*/}

                </Fragment>
            )
        }
    }

    const mapStateToProps = state => {
        return {
            isAuthenticated: !! state.auth.user && state.auth.user.id
        }
    };

    const mapDispatchToProps = {
        uiUpdateViewHistory
    };

    return connect(mapStateToProps, mapDispatchToProps)(WithCustomNav);
};


export default withCustomNav;