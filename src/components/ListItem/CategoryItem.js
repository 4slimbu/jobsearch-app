import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const categoryItem = props => {
    const {category, onSelectCategory} = props;
    console.log('categoryItem', category);
    return (
        <TouchableOpacity style={styles.categoryItem}
                          onPress={onSelectCategory}>
            <Icon color={Colors.grey1} name={category.icon} size={62}/>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 10,
        marginBottom: 20,
        width: '33%',
        alignItems: 'center',
    },
    categoryText: {
        color: Colors.grey1,
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default categoryItem;
