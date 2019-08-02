import React, {Component, Fragment} from 'react';
import {WebView} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getPage} from "../../store/actions/pageActions";
import * as _ from "lodash";
import {Icon} from "react-native-elements";
import {DrawerActions} from "react-navigation";
import {Feather} from '@expo/vector-icons';
import ContentLoading from "../../components/ContentLoading";

class PageDetailScreen extends Component {
    static navigationOptions = ({navigation}) => {
        let title = navigation.getParam('title');
        let backScreen = navigation.state.params.backScreen;

        return {
            title: title,
            headerLeft: (
                <Icon
                    name="arrow-back"
                    size={30}
                    type="ionicons"
                    containerStyle={{marginLeft: 10}}
                    onPress={() => navigation.navigate(backScreen)}
                />
            ),
            headerRight: (
                <Feather
                    name="bar-chart-2"
                    style={{marginRight: 10, transform: [{ rotate: "-90deg" }]}}
                    size={32}
                    color={Colors.darkGray}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }
    };

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        const {setParams} = this.props.navigation;
        setParams({backScreen: this.props.viewHistory[this.props.viewHistory.length - 1]});
    }

    async componentDidMount() {
        this._isMounted = true;
        const {params} = this.props.navigation.state;
        const {pages} = this.props.pages;
        const page = _.find(pages, {slug: params && params.navTarget});

        if (!page) {
            this._isMounted && await this.props.getPage(params && params.navTarget);
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {params} = this.props.navigation.state;
        const {pages} = this.props.pages;
        const page = _.find(pages, {slug: params && params.navTarget});
        return (
            <Fragment>
                <WebView
                    source={{ uri: page && page.url }}
                    style={{ marginTop: 20 }}
                    startInLoadingState={true}
                    renderLoading={() => <ContentLoading/>}
                />
            </Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        user: state.auth.user,
        pages: state.pages,
        viewHistory: state.ui.viewHistory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPage: (pageSlug) => dispatch(getPage(pageSlug)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetailScreen);
