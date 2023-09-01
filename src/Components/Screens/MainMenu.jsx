import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import CategoryItem from '../Categories/CategoryItem'
import { colors } from '../../Utils/Global/colors'
import { useGetCategoriesQuery } from '../../Services/shopService'
import BannerComponent from '../Common/BannerComponent'
import ProductsListGrid from '../Products/ProductsListGrid'

const MainMenu = ({ navigation }) => {
  const { data: categories, isLoading, isError } = useGetCategoriesQuery()
  const categoryNames = categories ? categories.map(category => category) : []

  return (
    <View style={styles.container}>
      <View style={styles.banner}>
      <BannerComponent />
      </View>
      <View style={styles.categoriesList}>
      <FlatList
        showsHorizontalScrollIndicator={true}
        horizontal={true}
        data={categoryNames}
        keyExtractor={category => category.name}
        renderItem={({ item }) => <CategoryItem item={item} navigation={navigation} />}
      />
      </View>
      <ProductsListGrid navigation={navigation} style={styles.productsListGrid}/>
    </View>
  )
}

export default MainMenu

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: colors.secondary,
    paddingTop: 10,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  banner: {
    width: '100%',
    height: 200,
  },
  categoriesList: {
    paddingTop: 20,
    paddingBottom: 20,
    height: 90,
  },
  productsListGrid: {
  }
})