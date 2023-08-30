import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { colors } from "../../Utils/Global/colors";
import MapComponent from "../Maps/MapComponent";
import { getClosestLocation, getDistance } from "../../Services/storeLocatorService"

const LocationSelector = ({ navigation }) => {

  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [stores, setStores] = useState([]);
  const [distance, setDistance] = useState(0);
  const [closestStore, setClosestStore] = useState({})
  const [error, setError] = useState("");
  
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        // There is a bug in the emulator that returns "lat itude" instead of "latitude" in the response.
        if (location.coords.latitude === undefined) {
          console.log('🟥 location payload error: ', location.coords);
          throw new Error('Location payload error')
        }
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

      } catch (error) {
        console.log('🟥 location error: ', error.message);
        setError(error.message)
      }
    })()
  }, [])

  //Reverse geocoding 
  useEffect(() => {
    (async () => {
      try {
        if (location.latitude ) {
          const storeObject = await getClosestLocation(location.latitude, location.longitude)
          const closestStoreData = {
            latlng: {
              latitude: storeObject.closestLocation.coordinates.latitude,
              longitude: storeObject.closestLocation.coordinates.longitude
            },
            title: storeObject.closestLocation.name,
            description: storeObject.closestLocation.address,
            latitude: storeObject.closestLocation.coordinates.latitude,
            longitude: storeObject.closestLocation.coordinates.longitude,
            address: storeObject.closestLocation.address,
            city: storeObject.closestLocation.city,
            name: storeObject.closestLocation.name,
          }
          console.log('🟢 closestStoreData: ', closestStoreData);
          setClosestStore(closestStoreData)
          const storeList = storeObject.storeList.map((store) => {
            return {
              latitude: store.coordinates.latitude,
              longitude: store.coordinates.longitude,
              address: store.address,
              city: store.city,
              name: store.name,
            }
          })
          setStores(storeList)
        }
      } catch (error) {
        // Hardcoded data because of Google Maps API key error "lat itude" instead of "latitude" in emulator.
        setClosestStore({
          name: 'Krusty Oil Rig Store',
          description: 'There is a Krusty Store near you!',
          latitude: -34.452026,
          longitude: -58.468837,
          address: 'Krusty Oil Rig Store, first floor, Krusty Oil Rig, Kru',
          city: 'Caiman Islands',
        })
        console.log('🟥 reverse geocoding error: ', error.message);
        setError(error.message);
      }
    })();
  }, [location]);

  useEffect(() => {    
    if (closestStore.latitude) {
      const storeDistance = getDistance(location.latitude, location.longitude, closestStore.latitude, closestStore.longitude)
      console.log('🟢 storeDistance: ', storeDistance);
      setDistance(Number(storeDistance))
    }
  }, [closestStore])

  return (
    <View style={styles.container}>
      <MapComponent location={location} closestStore={closestStore} storeList={stores} />
      {/* {location.latitude && <Text style={styles.text}>Lat: {location.latitude}, long: {location.longitude}.</Text>} */}
      {closestStore.address && <>
        <Text style={styles.text}>Closest store: {closestStore.address}, {closestStore.city}.</Text>
        <Text style={styles.text}>Store name: {closestStore.name}.</Text>
        <Text style={styles.text}>Distance: {distance} km.</Text>
      </>}
      {stores.length > 0 && <Text style={styles.text}>Stores: {stores.length}.</Text>}
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    paddingTop: 20,
    fontFamily: 'Josefin',
    fontSize: 18
  },
  noLocationContainer: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: colors.peach,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  address: {
    padding: 10,
    fontFamily: "Lobster",
    fontSize: 16,
  },
});
