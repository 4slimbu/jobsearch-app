import React from "react";
import {StyleSheet, View} from "react-native";
import PropTypes from "prop-types";
import {map} from "lodash";

import CategoryItem from "../ListItem/CategoryItem";

const CategoryList = (props) => {
    const {categories, onSelectCategory} = props;
    return map(categories, (category, key) => {
        return (
            <CategoryItem
                key={key}
                category={category}
                onSelectCategory={() => onSelectCategory(category.id)}
            />
        )
    });
};

const categoryList = props => {
    const {categories, onSelectCategory} = props;
    const categoryListProps = {
        categories: categories,
        onSelectCategory: onSelectCategory
    };
    return (
        <View style={styles.categoryContainer}>
            <CategoryList {...categoryListProps}/>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: 20,
        padding: 20,
    },
});

CategoryList.propTypes = {
    categories: PropTypes.object.isRequired,
    onSelectCategory: PropTypes.func.isRequired
};

export default categoryList;
