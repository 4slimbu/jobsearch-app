import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, StyleSheet, Text, View} from 'react-native';
import PropTypes from "prop-types";
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from "react-redux";
import {loadCategories} from "../../store/actions/categoryActions";
import CategoryList from "../../components/List/CategoryList";
import Colors from "../../constants/colors";
import {Image} from "react-native-elements";
import {DrawerActions} from "react-navigation";

const LogoUrl = require('../../../assets/icons/icon.png');

class CategoriesScreen extends Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: 'Loksewa',
            headerLeft: (
                <Image style={{marginLeft: 10, width: 40, height: 40}} source={LogoUrl}/>
            ),
            headerRight: (
                <Icon
                    name="bars"
                    size={30}
                    style={{marginRight: 10}}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                />
            ),
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            categories: [{}],
            isReady: false,
        };

        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this._isMounted && await this.props.onLoadCategories() &&
        this.setState({
            categories: this.props.categories
        });
        this.setState({isReady: true});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectCategory(categoryId) {
        console.log(categoryId);
        this.props.navigation.navigate('PostList', {categoryId: categoryId});
    }

    render() {
        const {isReady} = this.state;
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
                    {
                        !isReady ?
                            <ActivityIndicator size="large" color={Colors.primary} style={{marginTop: 100}}/>
                            :
                            <CategoryList {...categoryListProps}/>
                    }
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

CategoriesScreen.propTypes = {
    categories: PropTypes.object.isRequired
};

const mapStateToProps = state => {
    return {
        categories: state.categories
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);