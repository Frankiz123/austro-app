import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from "react-native";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import { addLocation } from "@reducers";
import { actions } from "@actions";
import moment from "moment";
import { isAllOf } from "@reduxjs/toolkit";

export function Location(props) {
  const { navigation } = props;
  const [isRunning, setIsRunning] = useState(false);
  const [coordinates, setCoordinates] = useState();

  const loginData = useSelector((state) => state.login);
  const latlng = useSelector((state) => state.map);
  const dispatch = useDispatch();

  const [currentLocation, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const mapRef = useRef(null);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Example App",
          message: "Example App access to your location ",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
        // alert("You can use the location");
        return true;
      } else {
        console.log("location permission denied");
        alert("Location permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const config = () => {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: "Background tracking",
      notificationText: "disabled",
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
      interval: 1500,
      fastestInterval: 1500,
      activitiesInterval: 5000,
      stopOnStillActivity: false,
      url: "http://192.168.81.15:3000/location",
      httpHeaders: {
        "X-FOO": "bar",
      },
      // customize post properties
      postTemplate: {
        lat: "@latitude",
        lon: "@longitude",
        foo: "bar", // you can also add your own properties
      },
    });
    BackgroundGeolocation.getCurrentLocation((location) => {
      console.log("location in get curretn location", location);
      setCoordinates({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
    });

    BackgroundGeolocation.on("location", (location) => {
      console.log("on locatin is----------------", location);
      sendLocationAPICall(location);

      setLocation(location);
      if (location) {
        animate(location);
      }

      setCoordinates({
        ...coordinates,
        latitude: location.latitude,
        longitude: location.longitude,
      });

      dispatch(addLocation(location));
      setIsLoading(false);

      // handle your locations here
      // to perform long running operation on iOS
      // you need to create background task
      BackgroundGeolocation.startTask((taskKey) => {
        // execute long running task
        // eg. ajax post location
        // IMPORTANT: task has to be ended by endTask
        BackgroundGeolocation.endTask(taskKey);
      });
    });

    BackgroundGeolocation.on("stationary", (stationaryLocation) => {
      // handle stationary locations here
      // Actions.sendLocation(stationaryLocation);
    });

    BackgroundGeolocation.on("error", (error) => {
      console.log("[ERROR] BackgroundGeolocation error:", error);
    });

    BackgroundGeolocation.on("start", () => {
      // Alert.alert('BackgroundGeolocation service has been started');
      console.log("[INFO] BackgroundGeolocation service has been started");
      setIsRunning(true);
    });

    BackgroundGeolocation.on("stop", () => {
      console.log("[INFO] BackgroundGeolocation service has been stopped");
      setIsRunning(false);
    });

    BackgroundGeolocation.on("authorization", (status) => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            ),
          1000
        );
      }
    });

    BackgroundGeolocation.on("background", () => {
      console.log("[INFO] App is in background");
    });

    BackgroundGeolocation.on("foreground", () => {
      console.log("[INFO] App is in foreground");
    });

    BackgroundGeolocation.on("abort_requested", () => {
      console.log("[INFO] Server responded with 285 Updates Not Required");
      BackgroundGeolocation.stop();

      // Here we can decide whether we want stop the updates or not.
      // If you've configured the server to return 285, then it means the server does not require further update.
      // So the normal thing to do here would be to `BackgroundGeolocation.stop()`.
      // But you might be counting on it to receive location updates in the UI, so you could just reconfigure and set `url` to null.
    });

    BackgroundGeolocation.on("http_authorization", () => {
      console.log("[INFO] App needs to authorize the http requests");
    });

    BackgroundGeolocation.checkStatus((status) => {
      console.log(
        "[INFO] BackgroundGeolocation service is running",
        status.isRunning
      );
      console.log(
        "[INFO] BackgroundGeolocation services enabled",
        status.locationServicesEnabled
      );
      console.log(
        "[INFO] BackgroundGeolocation auth status: " + status.authorization
      );
      // setIsRunning({status})
      // you don't need to check status before start (this is just the example)
      if (status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });
  };

  useEffect(async () => {
    const ifGranted = await requestLocationPermission();
    if (ifGranted) {
      config();
    }
    return () => {
      BackgroundGeolocation.removeAllListeners();
      BackgroundGeolocation.stop();
    };
  }, []);

  const toggleTracking = () => {
    BackgroundGeolocation.checkStatus(
      ({ isRunning, locationServicesEnabled, authorization }) => {
        console.log(
          "authorization",
          isRunning,
          locationServicesEnabled,
          authorization
        );
        if (isRunning) {
          BackgroundGeolocation.stop();
          return false;
        }

        if (!locationServicesEnabled) {
          Alert.alert(
            "Location services disabled",
            "Would you like to open location settings?",
            [
              {
                text: "Yes",
                onPress: () => BackgroundGeolocation.showLocationSettings(),
              },
              {
                text: "No",
                onPress: () => console.log("No Pressed"),
                style: "cancel",
              },
            ]
          );
          return false;
        }

        if (authorization == 99) {
          // authorization yet to be determined

          BackgroundGeolocation.start();
        } else if (authorization == BackgroundGeolocation.AUTHORIZED) {
          // calling start will also ask user for permission if needed
          // permission error will be handled in permisision_denied event
          BackgroundGeolocation.start();
        } else {
          Alert.alert(
            "App requires location tracking",
            "Please grant permission",
            [
              {
                text: "Ok",
                onPress: () => BackgroundGeolocation.start(),
              },
            ]
          );
        }
      }
    );
  };
  const sendLocationAPICall = async (location) => {
    const Resp = await actions.sendLocation({
      token: loginData.data.token,
      title: moment().format("DD-MM-YY"),
      status: "publish",
      fields: {
        cordinates: `${location.latitude}, ${location.longitude}`,
        speed: location.speed,
        is_moving: location.speed === 0 ? false : true,
        activity: "in_vehicle",
        stay: "3",
      },
    });

    if (!Resp.error) {
      console.log("send location api response------", Resp);
    }

    // setIsLoading(false);
  };

  const animate = (location) => {
    let r = {
      latitude: location.latitude,
      longitude: location.longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    };
    // root.animateToRegion(r, 2000);
    mapRef.current.animateToRegion(r, 2000);
  };
  useEffect(() => {
    console.log("latlng are---------------------", latlng);
  }, [latlng]);

  return (
    <View style={styles.container}>
      {coordinates && (
        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            initialRegion={coordinates}
            // onRegionChange={animate}
          >
            <Marker coordinate={coordinates} />
            {latlng?.latlng &&
              latlng?.latlng.length > 0 &&
              latlng?.latlng[0] && <Marker coordinate={latlng.latlng[0]} />}

            <Polyline
              coordinates={latlng.latlng}
              strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                "blue",
                // '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                // '#B24112',
                // '#E5845C',
                // '#238C23',
                // '#7F0000',
              ]}
              strokeWidth={4}
            />
          </MapView>
        </View>
      )}

      <View style={styles.footer}>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ fontWeight: "700" }}>Speed: </Text>
          <Text>
            {currentLocation ? (currentLocation.speed * 3.6).toFixed(2) : 0}{" "}
            Km/h
          </Text>
        </View>
        <TouchableOpacity style={styles.startbtn} onPress={toggleTracking}>
          <Text style={styles.btnText}>{isRunning ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CDEDFF",
  },
  mapContainer: {
    // flex: 1,
    backgroundColor: "#CDEDFF",
  },
  map: {
    height: "95%",
    width: "100%",
    // ...StyleSheet.absoluteFillObject,
  },
  btnTrack: {
    backgroundColor: "gray",
    borderRadius: 15,
    marginHorizontal: "20%",
  },

  text: {
    fontSize: 16,
    fontWeight: "600",
    left: 16,
    marginVertical: 5,
  },
  Heading: {
    fontSize: 25,
    fontWeight: "700",
    marginTop: 12,
    left: 16,
  },

  textContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
  },
  startbtn: {
    height: 35,
    width: 85,
    backgroundColor: "#432577",
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 5,
  },
  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 15 : 3,
    height: 50,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#CDEDFF",
  },
  btnText: {
    alignSelf: "center",
    marginVertical: Platform.OS === "ios" ? 3 : 1,
    fontSize: 16,
    color: "white",
    letterSpacing: 1,
  },
});
