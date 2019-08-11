import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import Colors from "../../constants/colors";
import {FontAwesome} from '@expo/vector-icons';

const categoryItem = props => {
    const {category, onSelectCategory} = props;
    return (
        <TouchableOpacity style={styles.categoryItem}
                        onPress={onSelectCategory}>
            <FontAwesome style={styles.catIcon} name={category.icon}/>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 20,
        backgroundColor:Colors.lightGray,
        borderRadius: 8,
        flex: 1/2,
        margin: 10,
        alignItems: 'center',
    },
    catIcon: {
        color:Colors.primary,
        fontSize:40,
    },
    categoryText: {
        color: Colors.darkGray,
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default categoryItem;
