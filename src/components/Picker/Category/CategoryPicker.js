import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CategoryPickerModal from "./CategoryPickerModal";
import Colors from "../../../constants/colors";
import PropTypes from "prop-types";

class CategoryPicker extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isVisible: false
        };

        this.changeVisibilityHandler = this.changeVisibilityHandler.bind(this);
    }

    changeVisibilityHandler(bool) {
        this.setState({isVisible: bool});
    }

    render() {
        const {isVisible} = this.state;
        const {selectedCategory} = this.props;

        const categoryPickerModalProps = {
            ...this.props,
            isVisible: isVisible,
            onChangeVisibility: this.changeVisibilityHandler
        };

        return (
            <Fragment>
                <TouchableOpacity onPress={() => this.changeVisibilityHandler(true)}>
                    <View style={styles.categoryPicker}>
                        <Text
                            style={selectedCategory ? styles.categoryTitleActive : styles.categoryTitle}>{selectedCategory.name ? selectedCategory.name : 'Select Category'}</Text>
                    </View>
                </TouchableOpacity>

                <CategoryPickerModal {...categoryPickerModalProps} />
            </Fragment>
        );
    }
}

CategoryPicker.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategory: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
};


const styles = StyleSheet.create({

    categoryPicker: {
        flex: 1,
        borderColor: Colors.greyOutline,
        borderRadius: 5,
        borderWidth: 1,
        padding: 20,
        alignItems: "center",
        width: '100%',
    },

    categoryTitle: {
        color: Colors.mediumGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },

    categoryTitleActive: {
        color: Colors.darkGray,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: "center",
    },

});

export default CategoryPicker;