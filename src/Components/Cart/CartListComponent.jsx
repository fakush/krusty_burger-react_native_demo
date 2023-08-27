import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartItemComponent from './CartItemComponent'

const CartListComponent = ({ product }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <FlatList 
                data={product.sizes} 
                keyExtractor={item => item.id} 
                renderItem={({ item }) => (<CartItemComponent item={item} />)} />
        </View>
    )
}

export default CartListComponent

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: "#772A2B",
        borderWidth: 1,
        borderRadius: 15,
        padding: 5,
        marginBottom: 5,
    },
    productTitle: {
        color: "#772A2B",
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 10,
    },
})