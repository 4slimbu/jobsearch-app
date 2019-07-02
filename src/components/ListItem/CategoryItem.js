import React from "react";
import {StyleSheet, Text, TouchableOpacity} from "react-native";
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
        width: '33.33%',
        alignItems: 'center',
        padding:10,
        display:'flex',
        justifyContent:'center',
    },
    categoryText: {
        color: Colors.grey1,
        fontSize: 14,
        fontWeight: 'bold',
    },
    catIcon: {
        color:'#000',
        fontSize:25,
        borderRadius:50,
        backgroundColor:'#f7f7f7',
        display:'flex',
        alignItems: 'center',
        justifyContent:'center',
        width:70,
        height:70,
        textAlign:'center',
        lineHeight:70,
        marginBottom:15, 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2.2,
    }
});

export default categoryItem;
