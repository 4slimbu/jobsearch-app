import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {loadCategories} from "../../store/actions/category";
import CategoryList from "../../components/List/CategoryList";
import Colors from "../../constants/colors";

class Categories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [{}]
        };

        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;
        this._isMounted && await this.props.onLoadCategories() &&
        this.setState({
            categories: this.props.categories
        })
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectCategory(categoryId) {
        console.log(categoryId);
        this.props.navigation.navigate('CategoryDetail', {categoryId: categoryId});
    }

    render() {
        const categoryListProps = {
            categories: this.props.categories,
            onSelectCategory: this.onSelectCategory
        };

        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    <View style={styles.headerContainer}>
                        <Icon color="white" name="code-fork" size={62}/>
                        <Text style={styles.heading}>Categories</Text>
                    </View>
                    <CategoryList {...categoryListProps}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        backgroundColor: Colors.primary,
        marginBottom: 20,
    },
    contentView: {
        flex: 1,
    },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

Categories.propTypes = {
    categories: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: dispatch(loadCategories)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);