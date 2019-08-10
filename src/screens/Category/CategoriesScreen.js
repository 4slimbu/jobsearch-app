import React, {Component} from 'react';
import appData from "../../constants/app";
import globalStyles from "../../constants/globalStyle";
import {TouchableOpacity} from "react-native";
import {ActivityIndicator, ScrollView, StyleSheet, View} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {connect} from "react-redux";
import {loadCategories} from "../../store/actions/categoryActions";
import CategoryList from "../../components/List/CategoryList";
import Colors from "../../constants/colors";
import {Image} from "react-native-elements";
import {DrawerActions} from "react-navigation";

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
        this.state = {
            categories: [{}],
            isLoading: false,
        };

        this.onSelectCategory = this.onSelectCategory.bind(this);
    }

    async componentDidMount() {
        this._isMounted = true;

        this.setState({isLoading: true});
        this._isMounted && await this.props.onLoadCategories() &&
        this.setState({ categories: this.props.categories });
        this.setState({isLoading: false});
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onSelectCategory(categoryId) {
        this.props.navigation.navigate('CategoryPostList', {...this.props.filter, category: [categoryId], type: 'category'});
    }

    render() {
        const {isLoading} = this.state.isLoading;
        const categoryListProps = {
            categories: this.props.categories,
            onSelectCategory: this.onSelectCategory
        };

        return (
            <ScrollView style={styles.container}>
                <View style={styles.contentView}>
                    {
                        isLoading ?
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
        backgroundColor: '#acacac',
        marginBottom: 20,
        padding:40,
    },
    contentView: {
        flex: 1,
    },
    heading: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
    },
});

const mapStateToProps = state => {
    return {
        categories: state.categories,
        filter: state.posts.filter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoadCategories: () => dispatch(loadCategories())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);