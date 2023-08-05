import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import CardComponent from '../Common/CardComponent'
import { texts } from '../../Global/texts'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../Redux/Actions/productActions'

const CategoryCard = ({ item, navigation }) => {
  const dispatch = useDispatch()

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item))
    navigation.navigate('Products', { category: item })
  }

  return (
    <Pressable onPress={onSelectCategory} style={styles.container}>
      <CardComponent>
        <Text style={texts.categories}>{item}</Text>
      </CardComponent>
    </Pressable>
  )
}

export default CategoryCard

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  }
})