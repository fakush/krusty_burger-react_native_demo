import { StyleSheet, Image, Text, View, Platform } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';

const markerImageLand = require('../../Assets/Icons/krusty-store_150.png')
const markerImageSea = require('../../Assets/Icons/krusty-store-drilling-rig_300.png')

const RenderMap = ({ location, closestStore, storeList }) => {
  const initialRegion = { latitude: -34.452026, longitude: -58.468837, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }
  const initialStore = [{ latlng: { latitude: -34.452026, longitude: -58.468837 }, title: 'Krusty Oil Rig Store', description: 'Krusty Store' }]
  const markerImage = location.latitude ? markerImageLand : markerImageSea

  const [region, setRegion] = useState(initialRegion)
  const [markers, setMarkers] = useState(initialStore)

  useEffect(() => {
    setRegion({
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    closestStore.name ? setMarkers([closestStore]) : setMarkers(initialStore)
    }, [location, storeList, closestStore])

  return (
    <>{ Platform.OS === 'web' ?
        <Image resizeMode='cover' style={styles.image} source={{uri: "https://firebasestorage.googleapis.com/v0/b/krusty-burger-app.appspot.com/o/krusty_map_500.jpg?alt=media&token=fa10ec18-819c-48f0-a7a8-2f483d762e00"}} /> :
      <MapView
      style={styles.container}
      initialRegion={region}
      region={region}
    >
      {markers.map((markers, index) => (
        <Marker
          key={index}
          coordinate={markers.latlng}
          title={markers.title}
          description={markers.description}
          image={markerImage}
        />
      ))}
    </MapView>
    }</>
  )
}

export default RenderMap

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
  },
  image: {
    marginTop: 15,
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderTopLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
})