import React, {Component} from 'react';
import {Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from "react-redux";
import * as _ from "lodash";
import Colors from "../constants/colors";
import * as Constants from "expo-constants";

/**
 * This will display a modal to pick category.
 * User can see list of categories
 * User can select only one of the categories
 * User can cancel their selection
 * User can click on done and it will return the selected category object
 */
class CategoryPickerModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            selectedCategory: {},
            isChanged: false,
        };

        this.cancelHandler = this.cancelHandler.bind(this);
        this.doneHandler = this.doneHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.reset = this.reset.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;
        // When component first loads set categories and selected category.
        this.setState({
            categories: this.props.categories,
            selectedCategory: this.props.selectedCategory,
        })
    }

    componentWillUnmount() {
        this.reset();
        this._isMounted = false;
    }

    reset() {
        this.setState({
            categories: [],
            selectedCategory: {},
            isChanged: false,
        })
    }

    cancelHandler() {
        // reset the isChanged value
        this.setState({isChanged: false});
        // turn off the modal visibility
        this.props.onChangeVisibility(false);
    }

    doneHandler() {
        // reset the isChanged value
        this.setState({isChanged: false});
        // return back the selected category
        this.props.onChange({selectedCategory: this.state.selectedCategory});
        // turn off the modal visibility
        this.props.onChangeVisibility(false);
    }

    onChangeHandler(selectedCategory) {
        this.setState({isChanged: true, selectedCategory: selectedCategory});
    }

    categoryList(categories, selectedCategory) {
        const dis = this;
        return (
            _.map(categories, function (item, key) {
                return <TouchableOpacity
                    key={key}
                    onPress={() => dis.onChangeHandler(item)}
                    style={[styles.categoryButton, selectedCategory.id === item.id && styles.categoryActive]}
                >
                    <Text style={[styles.buttonText, selectedCategory.id === item.id && styles.categoryActive]}>{item.name}</Text>
                </TouchableOpacity>
            })
        )
    }

    render() {
        const {isChanged} = this.state;
        const {categories, isVisible} = this.props;
        const selectedCategory = isChanged ? this.state.selectedCategory : this.props.selectedCategory;

        return (
            <Modal
                animationType="fade"
                transparent={false}
                visible={isVisible}
            >
                <View style={styles.modalContentWrapper}>
                    <ScrollView style={styles.container}>
                        <View style={styles.section}>
                            <Text style={styles.heading}>Categories</Text>
                            <View  style={styles.inlineButtonGroup}>
                                { this.categoryList(categories, selectedCategory) }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={{height: 54, flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity style={styles.button} onPress={this.cancelHandler}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        {
                            isChanged ?
                                <TouchableOpacity style={[styles.button]} onPress={this.doneHandler}>
                                    <Text>Done</Text>
                                </TouchableOpacity>
                                :
                                <View style={styles.button}><Text style={styles.dullText}>Done</Text></View>
                        }
                    </View>
                </View>
            </Modal>

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
    categoryButton: {
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
    categoryActive: {
        color: Colors.primary,
        borderColor: Colors.primary,
    },
    modalContentWrapper: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        flex: 1 / 2,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        margin: 2
    },

    dullText: {
        color: Colors.mediumGray
    },

    active: {
        color: Colors.primary
    }
});

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPickerModal);
