import React from "react";
import {FlatList, StyleSheet} from "react-native";
import {generateUniqueId} from "../../utils/helper/helper";
import CategoryItem from "../ListItem/CategoryItem";

const CategoryList = props => {
    const {categories, onSelectCategory} = props;
    return (
        <FlatList
            style={styles.categoryContainer}
            data={categories}
            keyExtractor={(item, key) => generateUniqueId(item.id)}
            renderItem={({item, key}) =>
                <CategoryItem
                    category={item}
                    onSelectCategory={() => onSelectCategory(item.id)}
                />
            }
            numColumns={2}
        />
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flex: 1,
        display: 'flex',
        padding: 10,
        marginTop: 5,
    }
});

export default CategoryList;
