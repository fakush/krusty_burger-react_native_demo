import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { texts } from '../../../Utils/Global/texts'

export default function TabIcon({ icon, color, text }) {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color={color} />
      <Text style={[texts.secondary, styles.text, { color: color }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  text: {
    textAlign: 'center',
    fontSize: 12,
  }
})