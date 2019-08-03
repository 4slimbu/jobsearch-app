import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Colors from "../../constants/colors";

class CategoryPicker extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {category, navigation, backScreen} = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('CategoryPickModal',
            {backScreen: backScreen})}>
                <View style={styles.categoryPicker}>
                    <Text style={category ? styles.categoryTitleActive : styles.categoryTitle}>{ category.name ? category.name: 'Select Category' }</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

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