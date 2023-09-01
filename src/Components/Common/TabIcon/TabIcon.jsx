import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'
import { texts } from '../../../Utils/Global/texts'

export default function TabIcon({ icon, color, text }) {
  return (
    <View>
      <IconButton icon={icon} size={24} containerColor={color} iconColor='white' />
      <Text style={[texts.secondary, styles.text, { color: color }]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 12,
  }
})