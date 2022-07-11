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

export const Merchants = (props) => {
  const { navigation, route } = props;
  console.log("Props in Merchants ==== ", props);
  const { params } = route;
  const [isLoading, setIsLoading] = useState(true);
  const [merchantList, setMerchantList] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const loginData = useSelector((state) => state.login);
  useEffect(() => {
    getMerchants();
    navigation.setOptions({
      title: `Merchants`,
    });
  }, []);
  const getMerchants = async () => {
    const merchantsResp = await actions.getMerchants(loginData.data.token);
    if (merchantsResp.length > 0) {
      setMerchantList(merchantsResp);
      setSearchedItem(merchantsResp);
    }
    setIsLoading(false);
  };
  const searchMerchant = (text) => {
    const filter = merchantList.filter((elm) => {
      return elm.title.rendered.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedItem(filter);
  };
  const renderItem = ({ item }) => {
    const buyer = item;
    return (
      <SafeAreaView style={styles.maincontainer}>
        <TouchableOpacity
          onPress={() => {
            params?.routeName === "NewOrder"
              ? navigation.navigate("NewOrder", { buyer })
              : navigation.navigate("ItemDetails", { item });
          }}
        >
          <View style={styles.innerContainer}>
            <Text style={styles.titleText}>{item.title.rendered}</Text>
            <Text style={styles.weatherText}>{item.slug}</Text>
          </View>
          {/* <View style={styles.temContainer}>
            <Text style={styles.tempText}>
              55
              <View style={styles.degreeContainer}>
                <Text style={styles.degreeText}>o</Text>
              </View>
              c
            </Text>
          </View> */}
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
          searchMerchant(text);
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
