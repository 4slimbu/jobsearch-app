import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Input} from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from "../../constants/colors";
import globalStyles from "../../constants/globalStyle";
import appData from "../../constants/app";

class PickLocation extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {value, errorMessage, navigation, backScreen} = this.props;
        return (
            <TouchableOpacity onPress={() => navigation.navigate('PickLocationModal', {backScreen: backScreen})} style={{width: appData.app.SCREEN_WIDTH - 50,
                borderRadius: 10,
                paddingTop: 7,
                alignItems: 'center'
            }}>
                <Input
                    leftIcon={
                        <Icon
                            name="map-marker"
                            color={Colors.primary}
                            size={25}
                            style={{backgroundColor: 'transparent', fontSize: 16,}}
                        />
                    }
                    value={value}
                    placeholder={'Location'}
                    inputStyle={globalStyles.inputStyle}
                    inputContainerStyle={globalStyles.inputContainerStyle}
                    editable={false}
                    autoCapitalize='none'
                    multiline={true}
                    errorMessage={errorMessage ? errorMessage : null}
                />
            </TouchableOpacity>
        );
    }
}

export default PickLocation;