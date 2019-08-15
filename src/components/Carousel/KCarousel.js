import React, {Component} from 'react';
import {ActivityIndicator, Animated, Platform, StyleSheet, View} from "react-native";
import {Image} from "react-native-elements";
import appData from "../../constants/app";
import SideSwipe from "react-native-sideswipe";
import * as _ from "lodash";

class KCarousel extends Component {
    constructor() {
        super();

        this.state = {
            entries: [],
            activeSlide: 0,
            currentIndex: 0,
        }
    }

    componentDidMount() {
        this.setState({
            entries: this.props.data
        })
    }

    renderItem ({ itemIndex, currentIndex, item, animatedValue }) {
        const image = item.url ? {uri: item.url} : require('../../../assets/images/placeholder.png');
        return (
            <View style={styles.item}>
                <Image
                    source={image}
                    resizeMode={'cover'}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    PlaceholderContent={<ActivityIndicator />}
                />
            </View>
        );
    }

    get pagination() {
        const {entries, currentIndex} = this.state;
        return (
            <View style={styles.paginationWrapper}>
                {
                    _.map(entries, function (item, key) {
                        return <Animated.View key={key} style={currentIndex === key ? styles.activeDotStyle : styles.dotStyle} />
                    })
                }
            </View>
        );
    }

    render() {
        return (
            <View>
                <SideSwipe
                    index={this.state.currentIndex}
                    itemWidth={appData.app.SCREEN_WIDTH}
                    style={{ width: appData.app.SCREEN_WIDTH }}
                    data={this.state.entries}
                    contentOffset={0}
                    onIndexChange={index =>
                        this.setState(() => ({ currentIndex: index }))
                    }
                    renderItem={this.renderItem}
                />
                { this.pagination }
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        width: appData.app.SCREEN_WIDTH,
        height: appData.app.SCREEN_WIDTH * 3 / 5, // keeping aspect ratio 5:3
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
    paginationWrapper: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        height: 30,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    dotStyle: {
        width: 10,
        height: 10,
        margin: 5,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#f7f7f7',
        overflow: 'hidden'
    },
    activeDotStyle: {
        width: 10,
        height: 10,
        margin: 5,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#f7f7f7',
        backgroundColor: 'white',
        overflow: 'hidden'
    }
});

export default KCarousel;