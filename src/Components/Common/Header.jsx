import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { texts } from '../../Utils/Global/texts'
import { colors } from 'react-native-elements'

const Header = () => {
  return (
    <View style={styles.container}>
      {/* <Image style={styles.image} source={require('../../Assets/Icons/krusty-burger-logo-1_500.png')} /> */}
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
    height: 40,
  },
  image: {
    width: 200,
    height: 40,
    resizeMode: 'contain',
  },
  text: {
    color: '#c11f44',
    paddingBottom: 5,
  }
})