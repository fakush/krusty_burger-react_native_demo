import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeProductFromCart } from '../../Redux/Slices/orderSlice';
import CartListComponent from '../Cart/CartListComponent';

const Orders = () => {
    const { cartArray } = useSelector(state => state.ordersReducer.value)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState({})
    const dispatch = useDispatch()

    const calculateTotal = () => {
        let total = 0
        cart.forEach(product => {
            product.sizes.forEach(item => {
                const itemPrice = item.discount > 0 ? item.price - (item.price * item.discount) : item.price
                total += item.quantity * itemPrice
            })
        })
        setTotal(total)
    }
    
    useEffect(() => {
        setCart(cartArray)
    }, [cartArray])

    // Note: had to use this useEffect to calculate total, because synchronous code was not working.
    useEffect(() => {
        calculateTotal()
    }, [cart])

    const onUpdateItem = (item) => {
        dispatch(addToCart(item))
    }

    const onRemoveFromCart = (id) => {
        dispatch(removeProductFromCart(id))
    }

    const onAddToItem = (item, name) => {
        console.log(item);
        // const newCart = cart.map(product => {
        //     if (product.id === item.id) {
        //         product.sizes.map(size => {
        //             if (size.name === name) {
        //                 size.quantity += 1
        //             }
        //             return size
        //         })
        //     }
        //     return product
        // })
        // dispatch(addToCart(newCart))
    }

    const onRemoveFromItem = (item, name) => {
        console.log(item);
        // const newCart = cart.map(product => {
        //     if (product.id === item.id) {
        //         product.quantity -= 1
        //     }
        //     return product
        // })
        // dispatch(addToCart(newCart))
    }

    return (
        <>
            {
                cart.length > 0 ?
                    <View style={styles.container}>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/jeremy_500.png?alt=media&token=44754387-4b34-4fd4-a92f-396d97fef47b' }} resizeMode='cover' />
                        <Text style={[texts.subtitle, styles.text]}>Your Order Details</Text>
                        <View style={styles.cartContainer}>
                            <FlatList 
                                    data={cart} 
                                    keyExtractor={item => item.id} 
                                    renderItem={({ item }) => (<CartListComponent 
                                                                        item={item} 
                                                                        updateItem={onUpdateItem}
                                                                        removeFromCart={onRemoveFromCart}
                                                                        addToItem={onAddToItem}
                                                                        removeFromItem={onRemoveFromItem}
                                                                        />)} />
                        </View>
                        <Text style={styles.total}>Grand Total: ${Math.round(total * 100) / 100}</Text>
                        <View style={styles.orderContainer}>
                            <Text style={[texts.subtitle, styles.text]}>Order Button</Text>
                        </View>
                    </View> :
                    <View style={styles.container}>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/Krusty_500.jpg?alt=media&token=20d2bfc4-c078-4dae-b356-8322fb629724' }} resizeMode='cover' />
                        <Text style={[styles.text, styles.cartEmpty]}>Get back when you have bought anything, you rat.</Text>
                    </View>
            }
        </>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        padding: 10,
        paddingBottom: 60,
    },
    banner: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: "#772A2B",
        fontWeight: 'bold',
    },
    total: {
        color: "#772A2B",
        fontWeight: 'bold',
        fontSize: 20,
        alignSelf: 'flex-end',
        paddingRight: 20,
    },
    snackbar: {
        backgroundColor: colors.primary,
        fontWeight: 'bold',
        marginBottom: 80
    },
    cartEmpty: {
        alignSelf: 'center',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
        textAlign: 'center',
    },
    cartContainer: {
        flex: 1,
        width: '100%',
        padding: 5,
    },
})