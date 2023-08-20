import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryCard from '../Categories/CategoryCard'
import { colors } from '../../Utils/Global/colors'
import { useGetCategoriesQuery } from '../../Services/shopService'

const Categories = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery()
  const categoryNames = categories ? categories.map(category => category.name) : []

  return (
    <View style={styles.container}>
      <FlatList
        data={categoryNames}
        keyExtractor={category => category}
        renderItem={({ item }) => <CategoryCard item={item} navigation={navigation} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default Categories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.secondary,
    padding: 10,
  }
})