import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../Redux/Slices/productSlice'
import { IconButton } from 'react-native-paper'
import { colors } from '../../Utils/Global/colors'

const CategoryItem = ({ item, navigation }) => {
  const dispatch = useDispatch()

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item))
    navigation.navigate('ProductsList', { category: item })
  }

  return (
    <Pressable onPress={onSelectCategory} style={styles.container}>
      <IconButton icon={item.icon} size={30} containerColor={colors.primary} iconColor='white' />
      <Text style={[texts.secondary, styles.Text]}>{item.name}</Text>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingLeft : 15,
    paddingRight : 15,
    borderRightWidth: 2,
    borderColor: colors.primary,
    height: 40,
  },
  Text: {
    color: colors.primary,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  }
})