import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import bannerArray from '../../Data/bannerArray';
import { shadows } from '../../Utils/Global/shadows';

const BannerComponent = () => {
    const isCarousel = React.useRef(null)
    const width = Dimensions.get('window').width;

    const SLIDER_WIDTH = Dimensions.get('window').width + 80
    const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={styles.container} key={index}>
                <Image
                    source={{ uri: item.url }}
                    style={styles.image}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                layout="default"
                layoutCardOffset={9}
                ref={isCarousel}
                data={bannerArray}
                renderItem={CarouselCardItem}
                sliderWidth={width}
                itemWidth={width}
                inactiveSlideShift={0}
                useScrollView={true}
                autoplayInterval={4000}
                autoplay={true}
                loop={true}
            />
        </View>
    );
}

export default BannerComponent

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    }
})