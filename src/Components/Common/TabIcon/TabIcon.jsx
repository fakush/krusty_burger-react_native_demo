import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'react-native-elements'
import { texts } from '../../../Global/texts'

export default function TabIcon({icon, color, text}) {
  return (
    <View>
        <Icon name={icon} size={24} type='material-community' color={color} />
        <Text style={[styles.text, texts.secondary]}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'center',
        fontSize: 12,
        color: 'black',
    }
})