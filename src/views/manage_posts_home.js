import React, {Component} from 'react';
import {ListView, ScrollView, StyleSheet, View} from 'react-native';

import {ListItem, Text,} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import colors from '../config/colors';

const log = () => {
  console.log('list clicked');
};

const managePostList = [
    {
        name: 'New Post',
        icon: 'av-timer',
        linearGradientColors: ['#FF9800', '#F44336'],
        target: 'AddPost'
    },
    {
        name: 'My Posts',
        icon: 'flight-takeoff',
        linearGradientColors: ['#3F51B5', '#2196F3'],
        target: 'MyPosts'
    },
    {
        name: 'My Comments',
        icon: 'fingerprint',
        linearGradientColors: ['#FFD600', '#FF9800'],
        target: 'MyComments'
    },
    {
        name: 'My Saved Posts',
        icon: 'lightbulb-outline',
        linearGradientColors: ['#4CAF50', '#8BC34A'],
        target: 'MySavedPosts'
    },
    {
        name: 'My Profile',
        icon: 'track-changes',
        linearGradientColors: ['#F44336', '#E91E63'],
        target: 'MyProfile'
    },
];

class ManagePosts extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.updateIndex = this.updateIndex.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  updateIndex(selectedIndex) {
    this.setState({ selectedIndex });
  }

  renderRow(rowData, sectionID) {
    return (
      <ListItem
        key={sectionID}
        onPress={log}
        title={rowData.title}
        leftIcon={{ name: rowData.icon }}
        chevron
        bottomDivider
      />
    );
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.headerContainer}>
          <Icon color="white" name="list" size={62} />
          <Text style={styles.heading}>Manage Posts</Text>
        </View>
        <View style={styles.list}>
          {managePostList.map((l, i) => (
            <ListItem
                leftIcon={{
                    name: l.icon,
                    size: 40
                }}
              key={i}
              onPress={()=> this.props.navigation.navigate(l.target)}
              title={l.name}
              subtitle={l.subtitle}
              chevron
              bottomDivider
            />
          ))}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: colors.greyOutline,
    backgroundColor: '#fff',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#FD6B78',
  },
  heading: {
    color: 'white',
    marginTop: 10,
    fontSize: 22,
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subtitleView: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 5,
  },
  ratingImage: {
    height: 19.21,
    width: 100,
  },
  ratingText: {
    paddingLeft: 10,
    color: 'grey',
  },
});

export default ManagePosts;
