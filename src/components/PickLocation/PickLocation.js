import React, {Component} from "react";
import {View, Text} from "react-native";

class PickLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: ''
    }
  }

  componentDidMount() {
    this.setState({
      inputText: this.props.selectedLocation.label
    })
  }

  onPickLocation(locationId) {
    this.props.save
  }

  render() {
    const {inputText, locations, onPickLocation, onSearchLocation} = props;

    return (
        <View>
          <Text>Pick Location</Text>
        </View>
    )
  }
};

export default PickLocation;
