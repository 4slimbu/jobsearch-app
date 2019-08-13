import React, {PureComponent} from "react";
import {FlatList, StyleSheet} from "react-native";
import {generateUniqueId} from "../../utils/helper/helper";
import CategoryItem from "../ListItem/CategoryItem";

class CategoryList extends PureComponent {
    render() {
        const {categories, onSelectCategory} = this.props;
        return (
            <FlatList
                style={styles.categoryContainer}
                data={categories}
                keyExtractor={(item, key) => generateUniqueId(item.id)}
                renderItem={({item, key}) =>
                    <CategoryItem
                        category={item}
                        onSelectCategory={() => onSelectCategory(item)}
                    />
                }
                numColumns={2}
            />
        );
    }

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
