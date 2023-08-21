import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ProductsList from '../Screens/ProductsList'
import MainMenu from '../Screens/MainMenu'
import ProductDetails from '../Screens/ProductDetail'
import Header from '../Common/Header'


const Stack = createNativeStackNavigator()

const MenuStack = () => {
  return (
      <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={({ route, navigation }) => ({
              header: () => {
                  return <Header route={route} navigation={navigation} />;
              },
          })}
      >
          <Stack.Screen name="MainMenu" component={MainMenu} />
          <Stack.Screen name="ProductsList" component={ProductsList} />
          <Stack.Screen name="ProductDetail" component={ProductDetails} />
      </Stack.Navigator>
  )
}

export default MenuStack