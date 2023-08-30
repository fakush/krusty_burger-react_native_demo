import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeProductFromCart, emptyCart } from '../../Redux/Slices/orderSlice';
import CartListComponent from '../Cart/CartListComponent';
import Button from '../Common/Buttons/DefaultButton';

const Orders = () => {
    const { cartArray } = useSelector(state => state.ordersReducer.value)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false);
    const [order, setOrder] = useState({})
    const [countDown, setCountDown] = useState(90)
    const [orderStep, setOrderStep] = useState(0)
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

    const takeOneSecond = useCallback(() => {
        if (countDown > 0) {
            setCountDown(countDown - 1)
        }
    })

    useEffect(() => {
        if (countDown < 90 && countDown > 60) {
            setOrderStep(0)
        } else if (countDown < 60 && countDown > 30) {
            setOrderStep(1)
        } else {
            setOrderStep(2)
        }
        const interval = setInterval(takeOneSecond, 1000);
        return () => clearInterval(interval);
    }, [countDown]);

    const onUpdateItem = (item) => {
        dispatch(addToCart(item))
    }

    const onRemoveFromCart = (id) => {
        dispatch(removeProductFromCart(id))
    }

    const onAddToItem = (item, name) => {
        const newSizesArray = []
        // this object is still read-only for web, but it works on mobile.
        const itemToUpdate = cart.find(product => product.id === item.id)
        itemToUpdate.sizes.forEach(size => {
            if (size.name === name) {
                const newSize = { ...size, quantity: size.quantity + 1 }
                size = newSize
            }
            newSizesArray.push(size)
        })
        const mutableItemToUpdate = { ...itemToUpdate }
        mutableItemToUpdate.sizes = newSizesArray
        dispatch(addToCart(mutableItemToUpdate))
    }

    const onRemoveFromItem = (item, name) => {
        const newSizesArray = []
        // this object is still read-only for web, but it works on mobile.
        const itemToUpdate = cart.find(product => product.id === item.id)
        itemToUpdate.sizes.forEach(size => {
            if (size.name === name) {
                const newSize = { ...size, quantity: size.quantity - 1 }
                size = newSize
            }
            newSizesArray.push(size)
        })
        const mutableItemToUpdate = { ...itemToUpdate }
        mutableItemToUpdate.sizes = newSizesArray
        dispatch(addToCart(mutableItemToUpdate))
    }

    const onPlaceOrder = () => {
        setCountDown(90)
        setOrder({ cart, total })
        // dispatch(emptyCart())
    }

    const orderView = () => {
        return (
            <View style={styles.container}>
                {orderStep === 0 ?
                    <>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order.png?alt=media&token=7279f1d9-c068-48f6-9c0d-f39b7b67f1f5' }} resizeMode='cover' />
                        <Text style={[styles.text, styles.cartEmpty]}>Your Order is in progress</Text>
                        <Text style={[styles.text, styles.cartEmpty]}>Your order Will be ready in 00:{countDown - 60} seconds.</Text>
                    </> : orderStep === 1 ?
                        <>
                            <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order_ready.png?alt=media&token=f78dd62b-0e06-444e-acae-888bba829840' }} resizeMode='cover' />
                            <Text style={[styles.text, styles.cartEmpty]}>Your Order is ready</Text>
                            <Text style={[styles.text, styles.cartEmpty]}>You have 00:{countDown - 30} seconds to get it or well trow it to the garbage.</Text>
                        </> :
                        <>
                            <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order_trash.png?alt=media&token=50046e4a-968b-473d-b735-79b580522a69' }} resizeMode='cover' />
                            <Text style={[styles.text, styles.cartEmpty]}>Your Order is in the garbage</Text>
                            <Text style={[styles.text, styles.cartEmpty]}>You have 00:{countDown} seconds to get your garbage.</Text>
                        </>
                }
            </View>
        )
    }

    const emptyCartView = () => {
        return (
            <View style={styles.container}>
                <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/Krusty_500.jpg?alt=media&token=20d2bfc4-c078-4dae-b356-8322fb629724' }} resizeMode='cover' />
                <Text style={[styles.text, styles.cartEmpty]}>Your Cart is Empty</Text>
                <Text style={[styles.text, styles.cartEmpty]}>Get back when you have money, you rat.</Text>
            </View>
        )
    }

    const CartView = () => {
        return (
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
                    <Button text='Place Order' color={colors.primary} onPress={() => onPlaceOrder()} />
                </View>
            </View>
        )
    }

    return (
        <>{cart.length > 0 ? CartView() : order.total ? orderView() : emptyCartView()}</>
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