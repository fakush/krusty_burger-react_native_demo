import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../Global/colors'
import { shadows } from '../Global/shadows';
import { texts } from '../Global/texts';

export default function ProductDetails({navigation, route}) {
  const { product } = route.params;

  return (
    <View style={[styles.container]}>
      <Image style={styles.image} source={{uri: product.thumbnail}} resizeMode='cover' />
      <ScrollView style={styles.detailsContainer}>
        <Text style={texts.subtitle}>{product.title}</Text>
        <Text style={texts.regular}>{product.description}</Text>
        <Text style={texts.regular}>${product.price}</Text>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.primaryAccent,
    alignItems: 'center',
    padding: 10,
  },
  detailsContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.primaryAccent,
    marginTop: 10,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }

})