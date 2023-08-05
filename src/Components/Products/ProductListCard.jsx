import { Image, Pressable, StyleSheet, Text } from 'react-native'
import React from 'react'
import CardComponent from '../Common/CardComponent'
import { texts } from '../../Global/texts'

const ProductListCard = ({ item, navigation }) => {
    return (
        <Pressable style={styles.container} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <CardComponent aditionalStyles={styles.cardStyles}>
                <Text style={[texts.categories, styles.cardText]}>{item.title}</Text>
                <Image resizeMode='cover' style={styles.image} source={{ uri: item.thumbnail }} />
            </CardComponent>
        </Pressable>
    )
}

export default ProductListCard

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    cardStyles: {
        flexDirection: 'row',
        height: 120,
        justifyContent: 'space-between',
        margin: 10,
        alignContent: 'center',
    },
    cardText: {
        maxWidth: 220,
    },
    image: {
        width: 100,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    }
})