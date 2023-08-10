import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker } from 'react-native-maps';
import { useState, useEffect } from 'react';

const markerImageLand = require('../../Assets/Icons/krusty-store_200.png')
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
    markers[0].title != 'Krusty Oil Rig Store' ?  setMarkers(closestStore) : setMarkers(initialStore)
    }, [location, storeList, closestStore])

  return (
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
  )
}

export default RenderMap

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '50%',
  }
})