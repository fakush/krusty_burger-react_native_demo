import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { colors } from '../../../Utils/Global/colors'

const AddToCart = ({ item, onAddToPurchase, onRemoveFromPurchase }) => {
  return (
    <View style={styles.container}>
      <IconButton
        icon='minus-thick'
        mode='contained'
        size={10}
        iconColor={colors.light}
        containerColor={item.quantity > 0 ? 'red' : '#E97373'}
        onPress={onRemoveFromPurchase}
      />
      <Text style={styles.amountContainer}>{item.quantity}0</Text>
      <IconButton
        icon='plus-thick'
        mode='contained'
        size={10}
        iconColor={colors.light}
        containerColor='green'
        onPress={onAddToPurchase}
      />
    </View>
  )
}

export default AddToCart

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  amountContainer: {
    width: 15,
    textAlign: 'center',
  }
})