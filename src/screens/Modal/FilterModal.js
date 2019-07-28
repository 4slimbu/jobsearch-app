import React, {Component} from 'react';
import {BackHandler, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon, Slider,} from 'react-native-elements';
import {connect} from "react-redux";
import {resetPostFilter, updatePostFilter} from "../../store/actions/postActions";
import * as _ from "lodash";
import Colors from "../../constants/colors";
import {prettyDistance, toggleItemInArray} from "../../utils/helper/helper";

class FilterModal extends Component {
    static navigationOptions = ({navigation}) => {
        let backScreen = navigation.getParam('backScreen');
        return {
            title: 'Filter',
            headerLeft: (
                <Icon
                    name="arrow-back"
                    size={30}
                    type="ionicons"
                    containerStyle={{marginLeft: 10}}
                    onPress={() => navigation.navigate(backScreen)}
                />
            ),
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            setTimeoutId: 0
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackIconPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackIconPress);
    }

    _onBackIconPress = () => {
        let backScreen = this.props.navigation.getParam('backScreen');
        this.props.navigation.navigate(backScreen);
        return true;
    };

    changeHandler(type, value) {
        let filterData = {isOn: true};
        if (type === 'category') { filterData.category = toggleItemInArray(this.props.postsFilter.category, value) }
        if (type === 'radius') { filterData.radius = _.ceil(value * 1000) }
        if (type === 'orderBy') { filterData.orderBy = value }

        clearTimeout(this.state.setTimeoutId);
        let setTimeoutId = setTimeout(function () {
            this.props.updatePostFilter(filterData);
        }.bind(this), 100);

        this.setState({setTimeoutId: setTimeoutId});
    }

    render() {
        const dis = this;
        const {postsFilter, categories} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Categories</Text>
                    <View  style={styles.inlineButtonGroup}>
                        {
                            _.map(categories, function (item, key) {
                                return <TouchableOpacity
                                    key={key}
                                    onPress={() => dis.changeHandler("category", item.id)}
                                    style={[styles.button, postsFilter.category.indexOf(item.id) !== -1 && styles.active]}
                                >
                                    <Text style={[styles.buttonText, postsFilter.category.indexOf(item.id) !== -1 && styles.active]}>{item.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Radius</Text>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <Slider
                            value={postsFilter.radius / 1000}
                            onValueChange={value => this.changeHandler("radius", value)}
                            thumbTintColor={Colors.primary}
                            minimumTrackTintColor={Colors.grey2}
                            maximumTrackTintColor={Colors.grey4}
                        />
                        <Text>Value: {prettyDistance(postsFilter.radius)}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>OrderBy</Text>
                    <View style={styles.inlineButtonGroup}>
                        <TouchableOpacity style={[styles.button, postsFilter.orderBy === 'nearest' && styles.active]}>
                            <Text style={[styles.buttonText, postsFilter.orderBy === 'nearest' && styles.active]}
                                  onPress={() => this.changeHandler("orderBy", "nearest")}
                            >Nearest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, postsFilter.orderBy === 'latest' && styles.active]}>
                            <Text style={[styles.buttonText, postsFilter.orderBy === 'latest' && styles.active]}
                                  onPress={() => this.changeHandler("orderBy", "latest")}
                            >Latest</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.section}>
                    <Button color={Colors.primary}
                            onPress={() => this.props.resetPostFilter()} title="Reset"/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    section: {
        marginBottom: 30
    },
    heading: {
        fontSize: 25,
        marginBottom: 15
    },
    inlineButtonGroup: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    button: {
        paddingTop: 7,
        paddingRight: 15,
        paddingBottom: 7,
        paddingLeft: 15,
        marginBottom: 10,
        marginRight: 10,
        textAlign:'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.grey3,
        display: 'flex'
    },
    buttonText: {},
    active: {
        color: Colors.primary,
        borderColor: Colors.primary,
    },
});

const mapStateToProps = state => {
    return {
        postsFilter: state.posts.filter,
        categories: state.categories,
        viewHistory: state.ui.viewHistory
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePostFilter: (filterData) => dispatch(updatePostFilter(filterData)),
        resetPostFilter: () => dispatch(resetPostFilter()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
