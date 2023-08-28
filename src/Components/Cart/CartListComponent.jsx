import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart, removeProductFromCart } from '../../Redux/Slices/orderSlice'
import CartItemComponent from './CartItemComponent'

const CartListComponent = ({ item, updateItem, removeFromCart, addToItem, removeFromItem }) => {
    const [product, setProduct] = useState(item)

    useEffect(() => {
        setProduct(item)
    }, [item])
    
    const cartUpdate = () => {
        updateItem(product)
    }

    const onAddToPurchase = (item) => {
        addToItem(product, item.name)
    }

    const onRemoveFromPurchase = (item) => {
        if (item.quantity === 1) {
            onDeleteFromPurchase(item)
        } else {
            removeFromItem(product, item.name)
        }
    }

    const onDeleteFromPurchase = (item) => {
        if (product.sizes.length === 1) {
            removeFromCart(product.id)
        } else {
            const newPurchase = product.sizes.filter(size => size.name !== item.name)
            product.sizes = newPurchase
            setProduct(product)
            cartUpdate()
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.productTitle}>{product.name}</Text>
            <FlatList
                data={product.sizes}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (<CartItemComponent
                    item={item}
                    onAddToPurchase={() => onAddToPurchase(item)}
                    onRemoveFromPurchase={() => onRemoveFromPurchase(item)}
                    onDeleteFromPurchase={() => onDeleteFromPurchase(item)}
                />)} />
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