import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Colors from "../../constants/colors";
import Icon from 'react-native-vector-icons/FontAwesome';

const categoryItem = props => {
    const {category, onSelectCategory} = props;
    return (
        <TouchableOpacity style={styles.categoryItem}
                        onPress={onSelectCategory}>
            <Icon style={styles.catIcon} name={category.icon}/>
            <Text style={styles.categoryText}>{category.name}</Text>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    categoryItem: {
        marginBottom: 20,
        width: '44%',
        margin:10,
        paddingTop: 20,
        paddingBottom: 20,
        display:'flex',
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.lightGray,
        borderRadius: 8,
    },
    catIcon: {
        color:Colors.primary,
        fontSize:40,
    },
    categoryText: {
        color: Colors.grey1,
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default categoryItem;
