import React, {Component} from 'react';
import Carousel, {ParallaxImage, Pagination}  from 'react-native-snap-carousel';
import {Platform, StyleSheet, View} from "react-native";
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
        if (item.is_primary) {
            return;
        }
        return (
            <View style={styles.item}>
                <ParallaxImage
                    source={image}
                    containerStyle={styles.imageContainer}
                    style={styles.image}
                    parallaxFactor={0.4}
                    {...parallaxProps}
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
                containerStyle={{paddingTop: 15, paddingBottom: 15}}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)'
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
                    sliderWidth={appData.app.SCREEN_WIDTH - 80}
                    sliderHeight={appData.app.SCREEN_WIDTH - 80}
                    itemWidth={appData.app.SCREEN_WIDTH - 80}
                    data={this.state.entries}
                    renderItem={this.renderItem}
                    hasParallaxImages={true}
                    loop={true}
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
        width: appData.app.SCREEN_WIDTH - 60,
        height: appData.app.SCREEN_WIDTH - 60,
    },
    imageContainer: {
        flex: 1,
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderRadius: 8,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
        resizeMode: 'cover',
    },
});

export default KCarousel;