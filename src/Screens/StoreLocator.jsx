import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { usePostUserLocationMutation } from "../Services/shopService";
import { useDispatch, useSelector } from "react-redux";
import { setUserLocation } from "../Redux/Actions/userActions";
import { colors } from "../Global/colors";
import { EXPO_PUBLIC_GOOGLE_MAPS_API_KEY } from "@env";
import MapComponent from "../Components/Maps/MapComponent";
import getStoreLocations from "../Services/storeLocatorService"

const google_maps_api_key = EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

const LocationSelector = ({ navigation }) => {

  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [stores, setStores] = useState([]);
  const [closestStore, setClosestStore] = useState({})

  const [error, setError] = useState("");

  const [address, setAddress] = useState("");

  const [triggerPostUserLocation, resultPostUserLocation] = usePostUserLocationMutation()
  const { localId } = useSelector(state => state.userReducer.value)
  const dispatch = useDispatch()

  const onConfirmAddress = () => {
    const locationFormatted = {
      latitude: location.latitude,
      longitude: location.longitude,
      address
    }

    dispatch(setUserLocation(
      locationFormatted
    ))

    triggerPostUserLocation({
      location: locationFormatted,
      localId
    })

    // navigation.goBack()
  }

  //Location requested on mount
  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

      } catch (error) {
        console.log(error.message);
        setError(error.message)
      }
    })()
  }, [])

  //Reverse geocoding
  useEffect(() => {
    (async () => {
      try {
        if (location.latitude) {
          const storeObject = await getStoreLocations(location.latitude, location.longitude)
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
        setError(error.message);
      }
    })();
  }, [location]);

  return (
    <View style={styles.container}>
      <MapComponent location={location} closestStore={closestStore} storeList={stores} />
      {location.latitude && <Text style={styles.text}>Lat: {location.latitude}, long: {location.longitude}.</Text>}
      {closestStore.address && <>
        <Text style={styles.text}>Closest store: {closestStore.address}, {closestStore.city}.</Text> 
        <Text style={styles.text}>Store name: {closestStore.name}.</Text> 
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
