import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from '../../Utils/Global/colors'
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeProductFromCart, emptyCart } from '../../Redux/Slices/orderSlice';
import CartListComponent from '../Cart/CartListComponent';
import IconButton from '../Common/Buttons/IconButton'
import { faker } from '@faker-js/faker';
import { Snackbar } from 'react-native-paper';
import { usePostCartMutation } from '../../Services/shopService';

const Orders = () => {
    const { cartArray } = useSelector(state => state.ordersReducer.value)
    const user = useSelector(state => state.userReducer.value)
    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0)
    const [visible, setVisible] = useState(false);
    const [snackMessage, setSnackMessage] = useState('')
    const [order, setOrder] = useState({})
    const [countDown, setCountDown] = useState(90)
    const [orderStep, setOrderStep] = useState(0)
    const [showOrderView, setShowOrderView] = useState(false)
    const dispatch = useDispatch()

    const [triggerPostCartMutation, resultPostCartMutation] = usePostCartMutation()

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
        if (countDown < 91 && countDown > 61) {
            setOrderStep(0)
        } else if (countDown < 60 && countDown > 31) {
            setOrderStep(1)
        } else if (countDown < 30 && countDown > 1) {
            setOrderStep(2)
        } else if (countDown == 0){
            setOrder({})
            setShowOrderView(false)
            setSnackMessage('Your order was feed to the dogs, better luck next time.')
            setVisible(true)
        }
        const interval = setInterval(takeOneSecond, 1000);
        return () => clearInterval(interval);
    }, [countDown]);

    useEffect(() => {
        if (resultPostCartMutation.isSuccess) {
            setCountDown(90)
            dispatch(emptyCart())
            setShowOrderView(true)
        } else if (resultPostCartMutation.isError) {
            setSnackMessage('There was an error sending your order, please try again later.')
            setVisible(true)
        }
    }, [resultPostCartMutation])

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

    const sendOrderToDb = (payload) => {
        try {
            triggerPostCartMutation(payload)
        } catch (err) {
            console.log('🟥 signup error: ', err.message);
        }
    }

    const onPlaceOrder = () => {
        const orderObject = { id: faker.string.uuid(), 
                                    phrase: `${faker.word.noun()}-${faker.word.noun()}-${faker.word.noun()}`, 
                                    localId: user.localId, 
                                    user: { 
                                        email: user.email, 
                                        fullName: user.fullName 
                                    }, cart: cartArray, 
                                    total: total }
        setOrder(orderObject)
        sendOrderToDb(orderObject)
    }

    const orderView = () => {
        return (
            <View style={styles.container}>
                {orderStep === 0 ?
                    <>
                        <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order.png?alt=media&token=7279f1d9-c068-48f6-9c0d-f39b7b67f1f5' }} resizeMode='cover' />
                        <Text style={[styles.text, styles.cartEmpty]}>Your Order is in progress</Text>
                        <Text style={[styles.text, styles.cartEmpty]}>Your order Will be ready in 00:{(countDown - 60).toString().padStart(2, '0')} seconds.</Text>
                    </> : orderStep === 1 ?
                        <>
                            <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order_ready.png?alt=media&token=f78dd62b-0e06-444e-acae-888bba829840' }} resizeMode='cover' />
                            <Text style={[styles.text, styles.cartEmpty]}>Your Order is ready</Text>
                            <Text style={[styles.text, styles.cartEmpty]}>You have 00:{(countDown - 30).toString().padStart(2, '0')} seconds to get it or well trow it to the garbage.</Text>
                        </> :
                        <>
                            <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/order_trash.png?alt=media&token=50046e4a-968b-473d-b735-79b580522a69' }} resizeMode='cover' />
                            <Text style={[styles.text, styles.cartEmpty]}>Your Order is in the garbage</Text>
                            <Text style={[styles.text, styles.cartEmpty]}>You have 00:{(countDown).toString().padStart(2, '0')} seconds to get your garbage.</Text>
                        </>
                }
                <Text style={[styles.text, styles.cartEmpty]}>Pickup phrase: {order.phrase}</Text>
                <Text style={[styles.text, styles.cartEmpty]}>Give this phrase to the cashier to pick up your order</Text>
                <Snackbar style={styles.snackbar} duration={2500} visible={visible} onDismiss={() => setVisible(false)}>{snackMessage}</Snackbar>
            </View>
        )
    }

    const emptyCartView = () => {
        return (
            <View style={styles.container}>
                <Image style={styles.banner} source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/Krusty_500.jpg?alt=media&token=20d2bfc4-c078-4dae-b356-8322fb629724' }} resizeMode='cover' />
                <Text style={[styles.text, styles.cartEmpty]}>Your Cart is Empty</Text>
                <View style={styles.message}>
                    <Text style={[styles.text, styles.cartEmpty]}>Get back when you have money, you rat.</Text>
                </View>
                <Snackbar style={styles.snackbar} duration={2500} visible={visible} onDismiss={() => setVisible(false)}>{snackMessage}</Snackbar>
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
                    <IconButton style={styles.logoutButton} icon='cash' text='Place Order' onPress={() => onPlaceOrder()} />
                </View>
                <Snackbar style={styles.snackbar} duration={2500} visible={visible} onDismiss={() => setVisible(false)}>{snackMessage}</Snackbar>
            </View>
        )
    }

    return (
        <>{showOrderView ? orderView() : cart.length > 0 ? CartView() : emptyCartView()}</>
    )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: colors.secondary,
        padding: 10,
        marginBottom: 60,
    },
    banner: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    text: {
        color: colors.secondaryAccent,
        fontWeight: 'bold',
    },
    total: {
        color: colors.secondaryAccent,
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
    message: {
        alignSelf: 'center',
        width: '90%',
        height: '50%',
        borderColor: colors.primary,
        borderWidth: 2,
        borderRadius: 20,
    }
})