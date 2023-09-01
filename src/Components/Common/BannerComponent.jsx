import React from 'react'
import { Dimensions, StyleSheet, View, Image, Platform } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import bannerArray from '../../Data/bannerArray';

const BannerComponent = () => {
    const isCarousel = React.useRef(null)
    const width = Dimensions.get('window').width;

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
            {Platform.OS === 'android' ?
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
                /> :
                <Image
                    source={{ uri: bannerArray[0].url }}
                    style={styles.image}
                />
            }
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