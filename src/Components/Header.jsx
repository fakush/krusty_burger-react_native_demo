import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { texts } from '../Global/texts'

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={[texts.logo, styles.text]}>Krusty Burger</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: '#f08401',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#c11f44',
  }
})