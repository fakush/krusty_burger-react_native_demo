import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import CardComponent from '../Common/CardComponent'
import { texts } from '../../Utils/Global/texts'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../Redux/Slices/productSlice'
import { Icon } from 'react-native-elements'
import { colors } from '../../Utils/Global/colors'

const CategoryItem = ({ item, navigation }) => {
  const dispatch = useDispatch()

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item))
    navigation.navigate('ProductsList', { category: item.name })
  }

  return (
    <Pressable onPress={onSelectCategory} style={styles.container}>
      <Icon name={item.icon} type="material-community" size={30} color={colors.primary} />
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