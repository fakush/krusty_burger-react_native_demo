import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from 'react-native-elements'

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
    backgroundColor: "#FF914F",
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  text: {
    color: '#c11f44',
  }
})