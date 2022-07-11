import React from "react";
import { useEffect } from "react";
import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import GetLocation from "react-native-get-location";
import { useState } from "react";

export function Map(props) {
  const [coordin, setCoord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const trackLocation = () => {
    console.log("your location is----");
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        setCoord({
          ...coordin,
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });
        setIsLoading(false);
        console.log(location);
      })
      .catch((error) => {
        const { code, message } = error;
        console.warn(code, message);
      });
  };
  useEffect(() => {
    trackLocation();
  });
  console.log("location is", coordin);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="small" color={'black'} />
      ) : (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={coordin}
          >
            <Marker coordinate={coordin} />
          </MapView>
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapContainer: {
    flex: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    left: 16,
    marginVertical: 5,
  },
  Heading: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 12,
    left: 16,
  },
  temp: {
    fontSize: 22,
    fontWeight: "500",
    alignSelf: "center",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 30,
  },
});
