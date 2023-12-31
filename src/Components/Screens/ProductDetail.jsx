import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors } from '../../Utils/Global/colors'
import { texts } from '../../Utils/Global/texts';
import ProductSizeCard from '../Products/ProductSizeCard';
import DefaultButton from '../Common/Buttons/DefaultButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../Redux/Slices/orderSlice';
import { Snackbar } from 'react-native-paper';

export default function ProductDetails({ navigation, route }) {
  const { product } = route.params;
  const [purchase, setPurchase] = useState(product.sizes.map(item => ({ name: item.name, price: item.price, discount: item.discount, quantity: 0 })))
  const [purchaseTotal, setPurchaseTotal] = useState(0)
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch()
  const { cartArray } = useSelector(state => state.ordersReducer.value)

  useEffect(() => {
    const cartItem = cartArray.find(item => item.id === product.id)
    if (cartItem) {
      const newPurchase = purchase.map(purchaseItem => {
        cartItem.sizes.forEach(size => {
          if (purchaseItem.name === size.name) {
            purchaseItem = size
          }
        })
        return purchaseItem
      })
      setPurchase(newPurchase)
    }
  }, [cartArray])

  useEffect(() => {
    calculateTotal()
  }, [purchase])

  const calculateTotal = () => {
    let total = 0
    purchase.forEach(item => {
      const itemPrice = item.discount > 0 ? item.price - (item.price * item.discount) : item.price
      total += item.quantity * itemPrice
    })
    setPurchaseTotal(total)
  }

  const onAddToPurchase = (item) => {
    const newPurchase = [...purchase]
    newPurchase.forEach(purchaseItem => {
      if (purchaseItem.name === item.name) {
        purchaseItem.quantity += 1
      }
      return purchaseItem
    })
    setPurchase(newPurchase)
  }

  const onRemoveFromPurchase = (item) => {
    const newPurchase = [...purchase]
    newPurchase.forEach(purchaseItem => {
      if (purchaseItem.name === item.name && purchaseItem.quantity > 0) {
        purchaseItem.quantity -= 1
      }
      return purchaseItem
    })
    setPurchase(newPurchase)
  }

  const onAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: purchaseTotal,
      sizes: purchase.filter(item => item.quantity > 0)
    }
    dispatch(addToCart(cartItem))
    setVisible(true)
  }

  const goToMainMenu = () => {
    setVisible(false)
    navigation.navigate('MainMenu')
  }

  const getItemsOnCart = (item) => {
    return purchase.find(purchaseItem => purchaseItem.name === item.name).quantity
  }

  return (
    <View style={[styles.container]}>
      <Image style={styles.image} source={{ uri: product.sizes[0].image }} resizeMode='cover' />
      <View style={styles.detailsContainer}>
        <Text style={[texts.subtitle, styles.text]}>{product.name}</Text>
        <Text style={texts.regular}>{product.description}</Text>
        <View style={styles.purchaseOptions}>
          <Text style={[texts.regular, styles.text]}>Purchase Options</Text>
          <FlatList
            data={product.sizes}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (<ProductSizeCard
              item={item}
              onCart={getItemsOnCart(item)}
              onAddToPurchase={() => onAddToPurchase(item)}
              onRemoveFromPurchase={() => onRemoveFromPurchase(item)} />)}
          />
        </View>
      </View>
      <View style={styles.addToCart}>
        <Text style={[texts.subtitle, styles.total]}>Total: {Math.round(purchaseTotal * 100) / 100}</Text>
        <DefaultButton icon={'cart'} text='Add to Cart' color={colors.primary} onPress={() => onAddToCart()} />
      </View>
      <Snackbar
        style={styles.snackbar}
        duration={1000}
        visible={visible}
        onDismiss={() => goToMainMenu()}
      >
        Item(s) added to cart!
      </Snackbar>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 60,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
    padding: 10,
  },
  detailsBody: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.secondary,
  },
  image: {
    width: '100%',
    height: 230,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: colors.secondaryAccent,
    fontWeight: 'bold',
  },
  purchaseOptions: {
    paddingTop: 10,
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
  },
  addToCart: {
    width: '100%',
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    alignContent: 'center',
  }

})