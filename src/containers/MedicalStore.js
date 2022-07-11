import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SearchInput, Button } from "@components";
import { actions } from "@actions";
import { useSelector, useDispatch } from "react-redux";

export const MedicalStore = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [isLoading, setIsLoading] = useState(true);
  const [storeList, setStoreList] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const loginData = useSelector((state) => state.login);
  useEffect(() => {
    getMedicalStores();
  }, []);
  const getMedicalStores = async () => {
    const storeResp = await actions.getMedicalStores(loginData.data.token);
    console.log("storeResp resp", storeResp);
    if (storeResp.length > 0) {
      setStoreList(storeResp);
      setSearchedItem(storeResp);

      // showAlert("Merchants", "Server error occured");
    }
    setIsLoading(false);
  };
  const searchItem = (text) => {
    const filter = storeList.filter((elm) => {
      return elm.title.rendered.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedItem(filter);
  };
  const renderItem = ({ item }) => {
    const seller = item;
    console.log("Value of item ==== ", item);
    return (
      <SafeAreaView style={styles.maincontainer}>
        <TouchableOpacity
          onPress={() => {
            params?.routeName === "NewOrder"
              ? navigation.navigate("NewOrder", { seller })
              : navigation.navigate("ItemDetails", { item });
          }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.titleText}>{item.title.rendered}</Text>
            <Text style={styles.weatherText}>{item.slug}</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <SearchInput
        iconName={"ios-search"}
        placeholder={"Search"}
        onChangeText={(text) => {
          searchItem(text);
        }}
      />
      {isLoading ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="small" color={"black"} />
        </View>
      ) : (
        <FlatList
          data={searchedItem}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.listcontainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    backgroundColor: "white",
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
