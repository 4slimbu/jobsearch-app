import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
import {connect} from "react-redux";

import {loadCategories} from "../../store/actions/categoryActions";
import CategoryList from "../../components/List/CategoryList";
import {trimNavTitle} from "../../utils/helper/helper";

class CategoriesScreen extends Component {
    constructor(props) {
        super(props);

        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.onLoadCategories();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectCategory(category) {
        this.props.navigation.navigate('CategoryPostList', {...this.props.filter, title: trimNavTitle(category.name), category: [category.id], type: 'category'});
    }

    render() {
        const {categories} = this.props;
        const categoryItemProps = {
            categories: categories,
            onSelectCategory: this.onSelectCategory
        };

        return (
            <View style={styles.contentView}>
                <CategoryList {...categoryItemProps}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    contentView: {
        flex: 1,
    },
});

const mapStateToProps = state => {
    return {
        categories: state.categories.categories,
        filter: state.posts.filter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);