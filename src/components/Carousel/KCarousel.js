import React, {Component} from 'react';
import Colors from '../../constants/colors';
import Carousel, {Pagination}  from 'react-native-snap-carousel';
import {Platform, StyleSheet, View} from "react-native";
import {Image} from "react-native-elements";
import appData from "../../constants/app";

class KCarousel extends Component {
    constructor() {
        super();

        this.state = {
            entries: [],
            activeSlide: 0
        }
    }

    componentDidMount() {
        this.setState({
            entries: this.props.data
        })
    }

    renderItem ({item, index}, parallaxProps) {
        const image = item.url ? {uri: item.url} : require('../../../assets/images/placeholder.png');
        return (
            <View style={styles.item}>
                <Image
                    source={image}
                    resizeMode={'cover'}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                />
            </View>
        );
    }

    get pagination() {
        const {entries, activeSlide} = this.state;
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeSlide}
                containerStyle={{paddingTop: 5, paddingBottom: 5, marginTop: -25}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    render() {
        return (
            <View>
                <Carousel
                    ref={(c) => { this._carousel = c; }}
                    sliderWidth={appData.app.SCREEN_WIDTH}
                    sliderHeight={appData.app.SCREEN_WIDTH * 3 / 5 }
                    itemWidth={appData.app.SCREEN_WIDTH}
                    data={this.state.entries}
                    renderItem={this.renderItem}
                    hasParallaxImages={true}
                    loop={true}
                    autoplay={false}
                    onSnapToItem={(index) => this.setState({ activeSlide: index }) }
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
});

export default KCarousel;