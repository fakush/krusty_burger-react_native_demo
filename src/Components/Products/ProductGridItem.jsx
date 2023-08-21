import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/Global/colors'

const ProductGridItem = ({item, navigation}) => {
  return (
      <Pressable style={styles.container} onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <Image resizeMode='cover' style={styles.image} source={{ uri: item.sizes[0].image }} />
              <Text style={styles.text}>{item.name} ${item.sizes[0].price}</Text>
    </Pressable>
  )
}

export default ProductGridItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        borderWidth: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: colors.primary,
        margin: 5,
        backgroundColor: colors.primary,
    },
    image: {
        width: '100%',
        height: 80,
    },
    text: {
        color: colors.secondary,
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    }
})