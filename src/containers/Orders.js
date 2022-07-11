import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "@actions";

export function Orders(props) {
  const { navigation } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [orderList, setOrderList] = useState([]);

  const loginData = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    getOrdersList();
  }, []);

  const getOrdersList = async () => {
    const { token } = loginData.data;
    setIsLoading(true);

    const Resp = await actions.getOrders(loginData.data.token);
    setIsLoading(false);
    if (!Resp.error) {
      console.log("get order response is ---------------=-", Resp);
      setOrderList(Resp);
    } else {
      Alert.alert("New order", Resp.error.message[0]);
    }
  };

  const renderItem = ({ item }) => {
    return (
      <SafeAreaView style={styles.maincontainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("ItemDetails", { item });
            console.log("value of ItemDetails Item ====== ", item);
          }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.titleText}>{item.slug}</Text>
            <Text style={styles.weatherText}>{item.status}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          size="small"
          color={"black"}
        />
      ) : (
        <View>
          <FlatList
            data={orderList}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.listcontainer}
          />
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
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

  textContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // marginHorizontal: 30,
  },
  maincontainer: {
    // borderBottomColor: "#000",
    borderBottomWidth: 0.5,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
