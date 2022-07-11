import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import moment from "moment";

import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import DatePicker from "react-native-date-picker";

import { useSelector, useDispatch } from "react-redux";
import { actions } from "@actions";

export const Journey = (props) => {
  const [isEndDate, setEndDateVisible] = useState(false);
  const [isStartDate, setStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const loginData = useSelector((state) => state.login);
  const [polyLineData, setPolyLineData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(async () => {
    getCoordinates();
  }, []);

  const getCoordinates = async () => {
    const { token } = loginData.data;
    setStartDateVisible(false);
    setIsLoading(true);
    const Resp = await actions.getJourney({
      token,
      startDate: moment(startDate).format("YYYY-MM-DD HH:mm:ss.SSS"),
    });
    if (!Resp.error) {
      console.log("get Journey response is ---------------=-", Resp);
      let newResp = null;
      newResp = Resp.map((val, index) => {
        if (val?.acf?.cordinates.split(",")[0] !== undefined) {
          let elem = {
            latitude: parseFloat(val?.acf?.cordinates.split(",")[0]),
            longitude: parseFloat(val?.acf?.cordinates.split(",")[1]),
          };
          return elem;
        }
      });
      setPolyLineData(newResp);
      setIsLoading(false);

      console.log("Value of Coordian state ===== ", newResp);
    } else {
      Alert.alert("New order", Resp.error.message[0]);
    }
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator
            style={{ justifyContent: "center", alignItems: "center" }}
            size="small"
            color={"black"}
          />
        </View>
      ) : (
        <View style={styles.mapContainer}>
          {polyLineData && polyLineData.length > 0 ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              initialRegion={{
                ...polyLineData[0],
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  ...polyLineData[0],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
              <Marker
                coordinate={{
                  ...polyLineData[polyLineData.length - 1],
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
              <Polyline
                coordinates={polyLineData}
                strokeColor="blue" // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={["blue"]}
                strokeWidth={6}
              />
            </MapView>
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                No results found, please change the dates to see the journeys
              </Text>
            </View>
          )}

          <View style={styles.footer}>
            <View style={styles.rowView}>
              <Text style={{ color: "black", fontWeight: "bold" }}>
                {moment(startDate).format("DD-MM-YY")}
              </Text>
              <TouchableOpacity
                style={styles.startbtn}
                onPress={() => {
                  isStartDate ? getCoordinates() : setEndDateVisible(false),
                    setStartDateVisible(!isStartDate);
                }}
              >
                <Text style={styles.btnText}>
                  {isStartDate ? "Done" : "Start Date"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      {isStartDate && (
        <DatePicker
          date={startDate}
          onDateChange={setStartDate}
          mode="date"
          androidVariant="nativeAndroid"
          textColor={"black"}
        />
      )}
    </View>
  );
};

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
  footer: {
    position: "absolute",
    bottom: Platform.OS === "ios" ? 15 : 3,
    alignItems: "center",
    backgroundColor: "#CDEDFF",
  },
  rowView: {
    width: "75%",
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btnText: {
    alignSelf: "center",
    marginVertical: Platform.OS === "ios" ? 3 : 1,
    fontSize: 16,
    color: "white",
    letterSpacing: 1,
  },
  startbtn: {
    // height: 35,
    width: 100,
    backgroundColor: "#432577",
    borderRadius: 20,
    // padding: 5,
    paddingVertical: 5,
    margin: 5,
  },
});
