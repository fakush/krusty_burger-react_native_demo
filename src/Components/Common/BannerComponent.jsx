import React from 'react'
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import bannerArray from '../../Data/bannerArray';
import { shadows } from '../../Utils/Global/shadows';

const BannerComponent = () => {
    const width = Dimensions.get('window').width;
    return (
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={bannerArray}
                scrollAnimationDuration={1900}
                // onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({ index }) => (
                    <View style={styles.container}>
                        <Image style={styles.image} source={{uri: bannerArray[index]}} />
                    </View>
                )}
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