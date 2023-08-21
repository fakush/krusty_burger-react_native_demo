import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../Utils/Global/colors'
import { texts } from '../../Utils/Global/texts';
import ProductSizeCard from '../Products/ProductSizeCard';
import DefaultButton from '../Common/Buttons/DefaultButton';

export default function ProductDetails({ navigation, route }) {
  const { product } = route.params;

  const onAddToPurchase = (item) => {
    console.log('🤡 Add to purchase')
  }

  const onRemoveFromPurchase = (item) => {
    console.log('🤡 Remove from purchase')
  }

  const onAddToCart = () => {
    console.log('🤡 Add to cart')
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
            keyExtractor={(item) => item.sizes}
            renderItem={({ item }) => (<ProductSizeCard item={item} onAddToPurchase={() => onAddToPurchase(item)} onRemoveFromPurchase={() => onRemoveFromPurchase(item)} />)}
          />
        </View>
      </View>
      <DefaultButton icon={'cart'} text='Add to Cart' color={colors.primary} onPress={() => onAddToCart()} />
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
    paddingBottom: 60,
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
    height: 300,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  text: {
    color: "#772A2B",
    fontWeight: 'bold',
  },
  purchaseOptions: {
    paddingTop: 10,
  },

})