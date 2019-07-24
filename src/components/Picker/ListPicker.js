import React from "react";
import {Picker, PickerIOS, Platform} from "react-native";
import * as _ from "lodash";

const ListPicker = (props) => {
    const {placeholderLabel, value, style, onSelect, items} = props;
    return (
        Platform.OS === 'ios' ?
            <PickerIOS
                selectedValue={value}
                style={style}
                onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
            >
                <PickerIOS.Item value="" label={placeholderLabel}/>
                {
                    _.map(items, (item, key) => {
                        return (
                            <PickerIOS.Item key={key} value={item.id} label={item.name}/>
                        )
                    })
                }
            </PickerIOS>
            :
            <Picker
                selectedValue={value}
                style={style}
                onValueChange={(itemValue, itemIndex) => onSelect(itemValue)}
            >
                <Picker.Item value="" label={placeholderLabel}/>
                {
                    _.map(items, (item, key) => {
                        return (
                            <Picker.Item key={key} value={item.id} label={item.name}/>
                        )
                    })
                }
            </Picker>
    )
};

export default ListPicker;
