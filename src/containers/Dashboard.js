import React, { useState, useEffect } from "react";
import {
  TextInput,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { WeatherList, Input, Button, showAlert } from "@components";
import { loginSuccess } from "@reducers";
import { useSelector, useDispatch } from "react-redux";
const { width: WIDTH } = Dimensions.get("window");
import { actions } from "@actions";
import { resetLoginState } from "@reducers";

export function Dashboard(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.login);
  const logout = () => {
    dispatch(resetLoginState());
    navigation.replace("SignIn");
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Merchants")}
          style={styles.buttonView}
        >
          <Text style={styles.btnText}>Merchants</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SearchItem")}
          style={styles.buttonView}
        >
          <Text style={styles.btnText}>Items</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewOrder")}
          style={styles.buttonView}
        >
          <Text style={styles.btnText}>Add New Order</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("MedicalStore")}
          style={styles.buttonView}
        >
          <Text style={styles.btnText}>Medical Store</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Location")} style={styles.buttonView}>
          <Text style={styles.btnText}>Location</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Orders")} style={styles.buttonView}>
          <Text style={styles.btnText}>Orders</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity onPress={logout} style={styles.buttonView}>
          <Text style={styles.btnText}>Logout</Text>
        </TouchableOpacity>
      </View>

      </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "white",
    // justifyContent: "center",
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
    margin: 10,
  },
  buttonView: {
    height: 150,
    width: WIDTH / 2.3,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#432577",
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});
