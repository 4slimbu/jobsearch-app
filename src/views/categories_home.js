import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../config/colors';

class CategoriesHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
      selectedIndexes: [0, 2, 3],
    };
  }

    _onPressButton() {
        // this.props.navigation.navigate('Categories');
    }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.contentView}>
            <View style={styles.headerContainer}>
                <Icon color="white" name="code-fork" size={62} />
                <Text style={styles.heading}>Categories</Text>
            </View>
          <View style={styles.categoryContainer}>

              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="qrcode" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="headphones" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="cog" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="pencil-square-o" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="eject" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="times-circle" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="fire" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="shopping-cart" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="cloud" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="cog" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="eject" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.categoryItem} onPress={() => this.props.navigation.navigate('CategoriesDetail')}>
                  <Icon color={Colors.grey1} name="pencil-square-o" size={62} />
                  <Text style={styles.categoryText}>Categories</Text>
              </TouchableOpacity>
          </View>
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
        backgroundColor: '#4F80E1',
        marginBottom: 20,
    },
  contentView: {
    flex: 1,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    width: '100%',
    marginTop: 20,
  },
  categoryItem: {
    padding: 10,
    marginBottom: 20,
    width: '33%',
    alignItems: 'center',
  },
  categoryText: {
    color: Colors.grey1,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
    heading: {
        color: 'white',
        marginTop: 10,
        fontSize: 22,
        fontWeight: 'bold',
    },
});

export default CategoriesHome;
