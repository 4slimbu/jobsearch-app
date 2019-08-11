import React, {Component} from 'react';
import {BackHandler, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon,} from 'react-native-elements';
import {connect} from "react-redux";
import * as _ from "lodash";
import Colors from "../../constants/colors";
import {resetCategory, setCategory} from "../../store/actions/formActions";

class CategoryPickModal extends Component {
    static navigationOptions = ({navigation}) => {
        let backScreen = navigation.getParam('backScreen');
        return {
            title: 'Pick Category',
            headerLeft: (
                <Icon
                    name="arrow-back"
                    size={30}
                    type="ionicons"
                    containerStyle={{marginLeft: 10}}
                    onPress={() => {
                        navigation.navigate(backScreen);
                    }}
                />
            ),
        }
    };

    constructor(props) {
        super(props);

        this.changeHandler = this.changeHandler.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this._onBackIconPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this._onBackIconPress);
    }

    _onBackIconPress = () => {
        let backScreen = this.props.navigation.getParam('backScreen');
        this.props.navigation.navigate(backScreen);
        return true;
    };

    changeHandler(category) {
        this.props.setCategory(category);
        let backScreen = this.props.navigation.getParam('backScreen');
        this.props.navigation.navigate(backScreen);
    }

    render() {
        const dis = this;
        const {category, categories} = this.props;
        return (
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Categories</Text>
                    <View  style={styles.inlineButtonGroup}>
                        {
                            _.map(categories, function (item, key) {
                                return <TouchableOpacity
                                    key={key}
                                    onPress={() => dis.changeHandler(item)}
                                    style={[styles.button, category.id === item.id && styles.active]}
                                >
                                    <Text style={[styles.buttonText, category.id === item.id && styles.active]}>{item.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    section: {
        marginBottom: 30
    },
    heading: {
        fontSize: 25,
        marginBottom: 15
    },
    inlineButtonGroup: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%'
    },
    button: {
        paddingTop: 7,
        paddingRight: 15,
        paddingBottom: 7,
        paddingLeft: 15,
        marginBottom: 10,
        marginRight: 10,
        textAlign:'center',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: Colors.grey3,
        display: 'flex'
    },
    buttonText: {},
    active: {
        color: Colors.primary,
        borderColor: Colors.primary,
    },
});

const mapStateToProps = state => {
    return {
        category: state.forms.category,
        categories: state.categories.categories,
        viewHistory: state.ui.viewHistory,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCategory: (categoryId) => dispatch(setCategory(categoryId)),
        resetCategory: () => dispatch(resetCategory()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPickModal);
