import React, {Component, Fragment} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import FilterModal from "./FilterModal";
import Colors from "../constants/colors";

class Filter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false,
            filter: {
                isOn: false,
                type: "",
                search: "",
                category: [],
                radius: 100,
                orderBy: "nearest", // nearest, latest,
            },
            defaultFilter: {
                isOn: false,
                type: "",
                search: "",
                category: [],
                radius: 100,
                orderBy: "nearest", // nearest, latest,
            },
        };

        this.cancelHandler = this.cancelHandler.bind(this);
        this.doneHandler = this.doneHandler.bind(this);
        this.filterChangeHandler = this.filterChangeHandler.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            filter: this.props.filter,
        })
    }

    componentWillUnmount() {
        this.reset();
        this._isMounted = false;
    }

    reset() {
        this.setState({
            isVisible: false,
            filter: {...this.state.defaultFilter},
        })
    }

    cancelHandler() {
        this.setState({isVisible: false});
    }

    doneHandler() {
        this.props.onFilterUpdate(this.state.filter);
        this.reset();
    }

    filterChangeHandler(filterData) {
        this.setState({filter: {...filterData, isOn: true}});
    }

    render() {
        const {filter} = this.state;
        return (
            <Fragment>
                <TouchableOpacity onPress={() => this.setState({isVisible: true})}>
                    <FontAwesome style={[styles.filter, filter.isOn && styles.active]} name="sliders"/>
                </TouchableOpacity>

                <Modal
                    animationType="fade"
                    transparent={false}
                    visible={this.state.isVisible}
                    >
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <View>
                            <FilterModal filter={this.state.filter} onChangeFilter={this.filterChangeHandler}/>
                            <View style={{height: 54, flexDirection: 'row', alignItems: 'center'}}>
                                <TouchableOpacity style={styles.button} onPress={this.cancelHandler}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                {
                                    filter.isOn ?
                                        <TouchableOpacity style={[styles.button]} onPress={this.doneHandler}>
                                            <Text>Done</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={styles.button}><Text style={styles.dullText}>Done</Text></View>
                                }
                            </View>
                        </View>
                    </View>
                </Modal>
            </Fragment>
        );
    }
}

const styles = StyleSheet.create({
   
    filterPicker: {
        flex: 1,
        borderColor: Colors.greyOutline,
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
        width: '100%',
    },

    filterTitle: {
        color: Colors.mediumGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },

    filterTitleActive: {
        color: Colors.darkGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },

    button: {
        flex: 1/2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        margin: 2
    },

    dullText: {
        color: Colors.mediumGray
    },

    filter: {
        color: Colors.darkGray,
        fontSize: 22,
        textAlign: "right"
    },

    active: {
        color: Colors.primary
    }
});

export default Filter;