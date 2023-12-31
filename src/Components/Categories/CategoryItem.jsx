import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { useDispatch } from 'react-redux'
import { setCategorySelected } from '../../Redux/Slices/productSlice'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { colors } from '../../Utils/Global/colors'

const CategoryItem = ({ item, navigation }) => {
  const dispatch = useDispatch()

  const onSelectCategory = () => {
    dispatch(setCategorySelected(item))
    navigation.navigate('ProductsList', { category: item })
  }

  return (
    <Pressable onPress={onSelectCategory} style={styles.container}>
      <Icon name={item.icon} size={30} color={colors.primary} />
      <Text style={[texts.secondary, styles.Text]}>{item.name}</Text>
    </Pressable>
  )
}

export default CategoryItem

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderRightWidth: 2,
    borderColor: colors.primary,
    height: 40,
  },
  Text: {
    color: colors.primary,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 1,
  },
  buttonStyle: {
    backgroundColor: 'grey',
    // width: '100%',
    // flexDirection: 'column'
  }
})