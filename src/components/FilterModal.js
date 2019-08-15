import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Slider,} from 'react-native-elements';
import {connect} from "react-redux";
import * as _ from "lodash";
import {prettyDistance, toggleItemInArray} from "../utils/helper/helper";
import Colors from "../constants/colors";

class FilterModal extends Component {

    constructor(props) {
        super(props);

        this.state = {
            setTimeoutId: 0
        };

        this.changeHandler = this.changeHandler.bind(this);
    }

    changeHandler(type, value) {
        let filterData = {...this.props.filter};

        if (type === 'category') { filterData.category = toggleItemInArray(this.props.filter.category, value) }
        if (type === 'radius') { filterData.radius = _.ceil(value * 100) }
        if (type === 'orderBy') { filterData.orderBy = value }

        clearTimeout(this.state.setTimeoutId);
        let setTimeoutId = setTimeout(function () {
            this.props.onChangeFilter(filterData);
        }.bind(this), 100);

        this.setState({setTimeoutId: setTimeoutId});
    }

    render() {
        const dis = this;
        const {filter, categories} = this.props;
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
                                    style={[styles.button, filter.category.indexOf(item.id) !== -1 && styles.active]}
                                >
                                    <Text style={[styles.buttonText, filter.category.indexOf(item.id) !== -1 && styles.active]}>{item.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Radius</Text>
                    <View style={{flex: 1, alignItems: 'stretch', justifyContent: 'center'}}>
                        <Slider
                            value={filter.radius / 100}
                            onValueChange={value => this.changeHandler("radius", value)}
                            thumbTintColor={Colors.primary}
                            minimumTrackTintColor={Colors.darkGray}
                            maximumTrackTintColor={Colors.mediumGray}
                        />
                        <Text>Value: {prettyDistance(filter.radius)}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.heading}>OrderBy</Text>
                    <View style={styles.inlineButtonGroup}>
                        <TouchableOpacity style={[styles.button, filter.orderBy === 'nearest' && styles.active]}>
                            <Text style={[styles.buttonText, filter.orderBy === 'nearest' && styles.active]}
                                  onPress={() => this.changeHandler("orderBy", "nearest")}
                            >Nearest</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, filter.orderBy === 'latest' && styles.active]}>
                            <Text style={[styles.buttonText, filter.orderBy === 'latest' && styles.active]}
                                  onPress={() => this.changeHandler("orderBy", "latest")}
                            >Latest</Text>
                        </TouchableOpacity>
                    </View>
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
        categories: state.categories.categories,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilterModal);
