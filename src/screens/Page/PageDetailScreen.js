import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../../constants/colors';
import {connect} from "react-redux";
import {getPage} from "../../store/actions/pageActions";
import * as _ from "lodash";

class PageDetailScreen extends Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        this._isMounted = true;
        const {params} = this.props.navigation.state;
        const {pages} = this.props.pages;
        const page = _.find(pages, {slug: params && params.navTarget});

        if (! page) {
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
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>{page && page.title}</Text>
                    </View>
                    <View style={{paddingLeft: 20, paddingRight: 20, marginBottom: 20}}>
                        <Text style={styles.postContent}>
                            { page && page.content }
                        </Text>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        padding: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#acacac',
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
    },
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        alignItems: 'center',
    },
    postTitle: {
        color: Colors.grey1,
        marginBottom: 5,
        fontSize: 20,
        fontWeight: 'bold',
    },
    postAuthorMeta: {
        color: Colors.grey1,
        marginBottom: 3,
        fontSize: 14,
    },
    postDateMeta: {
        color: Colors.grey1,
        marginBottom: 15,
        fontSize: 14,
        fontStyle: 'italic'
    },
    postContent: {
        color: Colors.grey1,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 15
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});


const mapStateToProps = state => {
    return {
        preferences: state.auth.user.preferences,
        user: state.auth.user,
        pages: state.pages
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPage: (pageSlug) => dispatch(getPage(pageSlug)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PageDetailScreen);
