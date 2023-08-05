import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {shadows} from '../../Global/shadows';
import { colors } from '../../Global/colors';
import {borders} from '../../Global/borders';

const CardComponent = ({children, aditionalStyles = []}) => {
  return (
    <View style={[styles.container, aditionalStyles]}>
      {children}
    </View>
  )
}

export default CardComponent

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        width: '95%',
        padding: 10,
        backgroundColor: colors.primary,
        ...shadows,
        ...borders.default
    }
})