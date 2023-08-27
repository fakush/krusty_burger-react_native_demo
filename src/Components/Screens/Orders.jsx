import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import { useDispatch, useSelector } from 'react-redux';
import CartListComponent from '../Cart/CartListComponent';

const Orders = () => {
    const dispatch = useDispatch()
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const { cartArray } = useSelector(state => state.ordersReducer.value)

    useEffect(() => {
        setCart(cartArray)
        calculateTotal()
    }, [cartArray])

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

    return (
        <>
            {
                cart.length > 0 ?
                    <View style={styles.container}>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/jeremy_500.png?alt=media&token=44754387-4b34-4fd4-a92f-396d97fef47b' }} resizeMode='cover' />
                        <Text style={[texts.subtitle, styles.text]}>Your Order Details</Text>
                        <View style={styles.cartContainer}>
                            <FlatList data={cart} keyExtractor={item => item.id} renderItem={({ item }) => (<CartListComponent product={item} />)} />
                        </View>
                        <Text style={styles.total}>Grand Total: ${Math.round(total * 100) / 100}</Text>
                        <View style={styles.orderContainer}>
                        </View>
                    </View> :
                    <View style={styles.container}>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/Krusty_500.jpg?alt=media&token=20d2bfc4-c078-4dae-b356-8322fb629724' }} resizeMode='cover' />
                        <Text style={[styles.text, styles.cartEmpty]}>Get back when you have bought anything</Text>
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
})