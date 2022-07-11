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
import { addToCart, updateCart, deleteFromCart } from "@reducers";
import Icon from "react-native-vector-icons/dist/Ionicons";
import { log } from "react-native-reanimated";
import { widthPercentageToDP } from "react-native-responsive-screen";

const IOS = Platform.OS === "ios";
const MINUS_ICON = IOS ? "ios-remove" : "md-remove";
const PLUS_ICON = IOS ? "ios-add" : "md-add";

export const SearchItem = (props) => {
  const { navigation, route } = props;
  const { params } = route;
  const [isLoading, setIsLoading] = useState(true);
  const [itemList, setItemList] = useState([]);
  const [searchedItem, setSearchedItem] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const loginData = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {}, [cart]);

  useEffect(() => {
    getItems();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      // headerLeft: () => (
      //   <TouchableOpacity
      //     style={{ left: 10 }}
      //     onPress={() => navigation.toggleDrawer()}
      //   >
      //     <BarsIcon name="bars" size={24} />
      //   </TouchableOpacity>
      // ),
      // headerTitle: () => {
      //   return (
      //     <>
      //       <Text>Location</Text>
      //     </>
      //   );
      // },
    });
  });
  const getItems = async () => {
    const itemResp = await actions.getItems(loginData.data.token);
    console.log("itemResp resp", itemResp);
    if (itemResp.length > 0) {
      setItemList(itemResp);
      setSearchedItem(itemResp);
    }
    setIsLoading(false);
  };
  const searchItem = (text) => {
    const filter = itemList.filter((elm) => {
      return elm.title.rendered.toLowerCase().includes(text.toLowerCase());
    });
    setSearchedItem(filter);
  };
  const addItemStatus = () => {
    const actionToDo = "status";
    let arry = [...cart.data];
    arry = cart.data.map((elem) => {
      return {
        ...elem,
        status: true,
      };
    });

    console.log("newArray is", arry);
    dispatch(updateCart({ Obj: arry, actionToDo }));
    navigation.navigate("NewOrder");
  };

  const addItem = (item) => {
    let arry = [...cart.data];
    let index = arry.findIndex((elem) => {
      return elem.id === item.id;
    });
    console.log("Value of Index in add Item ===== ", index);
    // const obj = { ...item, quantity: 1, status: true };
    const obj = { ...item, status: true };
    const actionToDo = "+";

    if (index >= 0) {
      let item = arry[index];
      if (item.quantity === 0) {
        // return;
        console.log("in Index of greate than 0");
        arry.splice(index, 1);
        dispatch(deleteItem(arry));
        // dispatch(addToCart(obj));
      } else {
        let item = arry[index];
        let qty = item.quantity;
        // console.log("Value of quantity greater than 0", qty);
        // dispatch(updateCart({ cart, Obj: obj, actionToDo }));
        arry.splice(index, 1);
        dispatch(deleteItem(arry));
      }
      // const obj = { ...item, quantity: 1, status: true };
      // dispatch(addToCart(obj));
      navigation.navigate("NewOrder");
    }
    if (index === -1) {
      console.log("in Index of less than 0");
      dispatch(addToCart(obj));
      navigation.navigate("NewOrder");
    }
  };
  const onPlusClick = ({ item, index }) => {
    const actionToDo = "+";
    const Obj = { ...item, quantity: 1, status: false };
    console.log("cart----------------------", cart);
    // console.log("Plus Pressed", index);
    const ifExist = cart.data.filter((elm) => elm.id === item.id);
    console.log("ifexist ", ifExist);
    if (ifExist.length < 1) {
      dispatch(addToCart(Obj));
    } else {
      dispatch(updateCart({ cart, Obj, actionToDo }));
    }
  };

  const onMinusClick = (Obj) => {
    const actionToDo = "-";
    // const Obj = { ...item, quantity: Qty, status: true };
    let arry = [...cart.data];
    let index = arry.findIndex((elem) => {
      return elem.id === Obj.item.id;
    });
    if (index >= 0) {
      let item = arry[index];
      if (item.quantity <= 1) {
        console.log("Value of Index ===== ", arry);
        arry.splice(index, 1);
        dispatch(deleteFromCart(arry));
      } else {
        dispatch(updateCart({ cart, Obj: Obj.item, actionToDo }));
      }
    }
  };
  const renderItem = ({ item, index }) => {
    const filteredItem = cart.data.filter((elem) => elem.id === item.id);
    return (
      <SafeAreaView style={styles.maincontainer}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            // onPress={() => {
            //   params === "NewOrder"
            //     ? addItem(item)
            //     : navigation.navigate("ItemDetails", { item });
            // }}
            // onPress={() => {
            //   params === "NewOrder" &&
            //     navigation.navigate("ItemDetails", { item });
            // }}
            onPress={() => {
              navigation.navigate("ItemDetails", { item });
            }}
            style={{ width: "70%" }}
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

          {props.route.params?.routeName === "NewOrder" && (
            <View style={styles.action}>
              <TouchableOpacity onPress={() => onMinusClick({ item, index })}>
                <View style={styles.minusContainer}>
                  <Icon name={MINUS_ICON} size={20} />
                </View>
              </TouchableOpacity>

              <Text style={styles.quantity}>
                {/* {filteredItem.length > 0 ? filteredItem[0].quantity : "Add"} */}
                {filteredItem.length > 0 && filteredItem[0].quantity > 0
                  ? filteredItem[0].quantity
                  : "Add"}
              </Text>

              <TouchableOpacity onPress={() => onPlusClick({ item, index })}>
                <View style={styles.plusContainer}>
                  <Icon name={PLUS_ICON} size={20} />
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  };
  console.log("cart is-------", cart);
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
        <>
          <FlatList
            data={searchedItem}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.listcontainer}
          />
          {cart.data.length > 0 ? (
            <View
              style={{
                width: widthPercentageToDP(100),
                justifyContent: "center",
                alignItems: "center",
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: "red",
                  padding: 10,
                  width: widthPercentageToDP(90),
                }}
                onPress={() => {
                  addItemStatus();
                }}
              >
                <Text style={{ color: "#fff", textAlign: "center" }}>
                  ADD ITEMS ({cart.data.length})
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <></>
          )}
        </>
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
  actionContainer: {
    overflow: "hidden",
    borderRadius: 20,
  },
  action: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "30%",
    height: 42,
    // paddingHorizontal: 0,
    overflow: "hidden",
  },
  actionTitle: {
    color: "blue",
    textAlign: "center",
  },
  quantity: {
    top: -1,
    paddingHorizontal: 13,
    fontSize: 18,
    color: "green",
    textAlign: "center",
  },
  plusContainer: {
    backgroundColor: "#ECF0F1",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
  minusContainer: {
    backgroundColor: "#ECF0F1",
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 25,
    height: 25,
  },
});
