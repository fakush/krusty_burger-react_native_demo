import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Products from '../Screens/Products'
import Categories from '../Screens/Categories'
import ProductDetails from '../Screens/ProductDetail'
import Header from '../Components/Header'


const Stack = createNativeStackNavigator()

const ShopStack = () => {
  return (
      <Stack.Navigator
          initialRouteName="Home"
          screenOptions={({ route, navigation }) => ({
              header: () => {
                  return <Header route={route} navigation={navigation} />;
              },
          })}
      >
          <Stack.Screen name="Category" component={Categories} />
          <Stack.Screen name="Products" component={Products} />
          <Stack.Screen name="ProductDetail" component={ProductDetails} />
      </Stack.Navigator>
  )
}

export default ShopStack