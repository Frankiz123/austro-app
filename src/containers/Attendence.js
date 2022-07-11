import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const Attendance = () => {
  const name = `   Punch In: 8:45 pm \n               Punch Out: `;
  const name2 = `11:59 pm`;
  const name3 = `   Punch In: 11:07 am \n     Punch Out: `;
  const name4 = `11:59 pm`;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.card}>
        <View style={styles.container}>
          <Text style={styles.headerTxt}>Today's attendance:</Text>
          <Text style={styles.text}>Thu, Jul 8</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.btn}>
              <Text style={styles.text1}>PUNCH IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.text2}>PUNCH OUT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.lowTxt}>Enter Work Details</Text>
        </View>
      </View>
      <View>
        <Text style={styles.textDown}>
          13
          <Text
            style={{
              color: "grey",
              fontSize: 17,
              marginLeft: 15,
            }}
          >
            {" "}
            <Text>{name}</Text>
            <Text style={{ fontWeight: "400", color: "black" }}>{name2}</Text>
          </Text>
        </Text>

        <Text style={styles.textDown1}>Jun</Text>
        <Text style={styles.textDown2}>Sun</Text>
        <View>
          <Text style={styles.textDown}>14</Text>
          <Text
            style={{
              color: "grey",
              fontSize: 17,
              marginLeft: 65,
            }}
          >
            {" "}
            <Text style={{}}>{name3}</Text>
            <Text style={{ fontWeight: "400", color: "black" }}>{name4}</Text>
          </Text>
          <Text style={styles.textDown1}>Apr</Text>

          <Text style={styles.textDown2}>Wed</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  headerTxt: {
    marginTop: 5,
    fontSize: 22,
    fontWeight: "500",
  },
  text: {
    fontSize: 22,
    fontWeight: "500",
  },
  text1: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  text2: {
    color: "white",
    fontSize: 15,
    fontWeight: "700",
  },
  buttonContainer: {
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
    width: "91%",
    justifyContent: "space-between",
  },
  lowTxt: {
    fontSize: 18,
    color: "red",
    alignItems: "flex-start",
    width: "91%",
    marginTop: 15,
  },
  btn: {
    height: 50,
    width: 150,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    padding: 5,
    borderRadius: 6,
    elevation: 2,
    backgroundColor: "white",
    shadowOffset: { height: 1.5, width: 1.5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  textDown: {
    fontSize: 40,
    fontWeight: "500",
    marginTop: 30,
    marginLeft: 15,
  },
  textDown1: {
    marginLeft: 15,
    fontSize: 17,
  },
  textDown2: {
    color: "grey",
    marginLeft: 15,
    fontSize: 17,
  },
});
