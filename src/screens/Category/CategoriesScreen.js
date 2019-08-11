import React, {Component} from 'react';
import appData from "../../constants/app";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Feather} from '@expo/vector-icons';
import {connect} from "react-redux";
import {loadCategories} from "../../store/actions/categoryActions";
import Colors from "../../constants/colors";
import {Image} from "react-native-elements";
import {DrawerActions} from "react-navigation";
import * as globalStyles from "../../constants/globalStyle";
import CategoryList from "../../components/List/CategoryList";

class CategoriesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Browse Categories',
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
                    <Image 
                        style={globalStyles.innerLogo}
                        source={appData.app.LOGO_INNER_URL}
                    />
                </TouchableOpacity>
            ),
            headerRight: (
                <Feather
                    name="bar-chart-2"
                    style={{marginRight: 10, transform: [{ rotate: "-90deg" }]}}
                    size={32}
                    color={Colors.darkGray}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }
    };

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

    onSelectCategory(categoryId) {
        this.props.navigation.navigate('CategoryPostList', {...this.props.filter, category: [categoryId], type: 'category'});
    }

    render() {
        const {categories} = this.props;
        const categoryItemProps = {
            categories: categories,
            onSelectCategory: this.onSelectCategory
        };

        console.log(categoryItemProps);
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