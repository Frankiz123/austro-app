import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { SearchInput, Button, Input } from "@components";
const { width: WIDTH } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { actions } from "@actions";
import { useSelector, useDispatch } from "react-redux";
import ActivityIndicatorModal from "../components/modals/ActivityIndicatorModal";
import Entypo from "react-native-vector-icons/Entypo";

import { resetCart, deleteItem } from "@reducers";

export const NewOrder = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState();
  const [comment, setComment] = useState();
  const [title, setTitle] = useState();

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // state, dispatch
  const loginData = useSelector((state) => state.login);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ left: 10 }}
          onPress={() => navigation.replace("Home")}
        >
          <View>
            <Text>Back</Text>
          </View>
        </TouchableOpacity>
      ),
    });

    console.log("cart is --", cart);
    setProducts(cart);
  }, [cart]);

  // console.log("props are dfadjf", props.route.params);
  const { navigation, route } = props;
  const { params } = route;
  if (params !== undefined) {
    var buyer = params.buyer;
    var seller = params.seller;
  }
  const AddItems = () => {
    navigation.navigate("SearchItem", { routeName: "NewOrder" });
  };

  const delHandler = (id) => {
    dispatch(deleteItem(id));
  };

  const completeOrderAPICall = async () => {
    if (!buyer || !seller || !title || !comment || cart.data.length < 1) {
      Alert.alert(
        "New order",
        "All fields are required"
        // [
        //   {
        //     text: "Cancel",
        //     onPress: () => console.log("Cancel Pressed"),
        //     style: "cancel"
        //   },
        //   { text: "OK", onPress: () => console.log("OK Pressed") }
        // ]
      );
    } else {
      // return;
      const { token } = loginData.data;
      const status = buyer ? buyer.status : seller.status;
      setIsLoading(true);
      const Resp = await actions.completeOrder({
        token: token,
        title: title,
        status: status,
        // content:
        //   "<h1> Hi I am a Heading</h1> <p> Content paragraph will be added here</p>",
        fields: {
          buyer: buyer && buyer.id,
          seller: seller && seller.id,
          comments: comment,
          items: cart.data,
        },
      });
      setIsLoading(false);
      if (!Resp.error) {
        Alert.alert("New order", "Processed Successfully", [
          {
            text: "OK",
            onPress: () => {
              dispatch(resetCart());
              navigation.replace("Home");
            },
          },
        ]);
      } else {
        dispatch(resetCart());
        Alert.alert("New order", Resp.error.message[0]);
      }
    }
  };

  // const name = params.name;
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.inputContainer}>
          <View style={styles.uppertextContianer}>
            <Text style={styles.uppertext}>Buyer</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Merchants", { routeName: "NewOrder" })
            }
          >
            <View pointerEvents="none">
              <Input
                placeholder="Retailer/Stockist Name"
                style={styles.input}
                FontistoIconBool={true}
                editable={false}
                iconName="shopping-store"
                iconStyles={styles.iconStyles}
                closeIconBool="close"
                value={buyer && buyer.title.rendered}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <View style={styles.uppertextContianer}>
            <Text style={styles.uppertext}>Seller</Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("MedicalStore", { routeName: "NewOrder" })
            }
          >
            <View pointerEvents="none">
              <Input
                placeholder="Distrubutor/Stockist Name"
                style={styles.input}
                FontistoIconBool={true}
                iconName="shopping-store"
                iconStyles={styles.iconStyles}
                closeIconBool="close"
                value={seller && seller.title.rendered}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.listContainer}>
            <View style={styles.headerTextContainer}>
              <View style={{ left: wp(7) }}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.ItemNameHeader}>Item Name</Text>
              <View style={styles.leftQTYBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.QTYheader}>QTY</Text>
              <View style={styles.leftPriceBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.PriceHeader}>Price</Text>
            </View>

            {products &&
              products.data.map((item) => {
                const { status } = item;
                return status === true ? (
                  <View style={styles.productContainer}>
                    <View style={styles.leftBordercolor}>
                      <Entypo
                        name={"circle-with-cross"}
                        size={20}
                        onPress={() => delHandler(item.id)}
                        // style={{ }}
                      />

                      <Text style={styles.barcolor}>|</Text>
                    </View>
                    <Text numberOfLines={3} style={styles.ItemNameText}>
                      {item.title.rendered}
                    </Text>
                    <View style={styles.leftQTYBordercolor}>
                      <Text style={styles.barcolor}>|</Text>
                    </View>
                    <Text style={styles.QTYText}>{item.quantity}</Text>
                    <View style={styles.leftPriceBordercolor}>
                      <Text style={styles.barcolor}>|</Text>
                    </View>
                    <Text style={styles.PriceText}>{item.acf.mrp}</Text>
                  </View>
                ) : (
                  <View></View>
                );
              })}

            <Button style={styles.AddMoreItembutton} onPress={AddItems}>
              + Add More Items
            </Button>
            <View style={styles.bootomContainer}>
              <Text style={styles.totaltext}>Total</Text>
              <View style={styles.leftTotalBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.uppertextContianer}>
              <Text style={styles.uppertextCreatedBy}>Title</Text>
            </View>
            <Input
              onChangeText={(text) => {
                setTitle(text);
              }}
              placeholder="Add title"
              style={styles.inputcomment}
              FontistoIconBool={false}
              iconName="list-circle-outline"
              iconStyles={styles.iconStyles}
            />
            <View style={styles.borderLine}></View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.uppertextContianer}>
              <Text style={styles.uppertextCreatedBy}>Created By</Text>
            </View>
            <Input
              placeholder="Anirudh Babbar"
              value="Anirudh Babbar"
              style={styles.input}
              FontistoIconBool={true}
              iconName="user-secret"
              iconStyles={styles.iconStyles}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.uppertextContianer}>
              <Text style={styles.uppertextCreatedBy}>Comments</Text>
            </View>
            <Input
              onChangeText={(text) => {
                setComment(text);
              }}
              placeholder="Add a comment for this order"
              style={styles.inputcomment}
              FontistoIconBool={false}
              iconName="reader-outline"
              iconStyles={styles.iconStyles}
            />
            <View style={styles.borderLine}></View>
          </View>
        </View>
        <ActivityIndicatorModal
          statusBarColor={"gray"}
          message="Please wait . . ."
          // onRequestClose={this.closeModal}
          title="Sending instructions"
          visible={isLoading}
        />
      </ScrollView>
      <View style={styles.fotterContainer}>
        <View style={styles.fotterbtnContainer}>
          <Button
            style={styles.bottombutton}
            onPress={() => dispatch(resetCart())}
          >
            SAVE DRAFT
          </Button>
          <Button style={styles.bottombutton} onPress={completeOrderAPICall}>
            COMPLETE ORDER
          </Button>
        </View>
      </View>

      {/* <ActivityIndicator animating={isLoading} size="small" /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: WIDTH - 10,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  inputcomment: {
    width: WIDTH - 10,
    right: 8,
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  borderLine: {
    width: wp(70),
    left: wp(0.8),
    borderTopWidth: 1,
    bottom: hp(2),
  },
  iconStyles: {
    left: 30,
  },
  inputContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  uppertextContianer: {
    position: "absolute",
    top: -5,
    left: 57,
  },
  uppertext: {
    fontWeight: "200",
  },
  bootomContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    bottom: hp(2),
    borderColor: "rgba(218, 223, 225, 1)",
  },
  listContainer: {
    width: WIDTH - 50,
  },
  totaltext: {
    left: 150,
    fontWeight: "bold",
  },
  headerTextContainer: {
    marginTop: 12,
    borderBottomWidth: 2,
    borderColor: "rgba(218, 223, 225, 1)",
    paddingBottom: hp(0.3),
    flexDirection: "row",
  },
  productContainer: {
    borderBottomWidth: 1,
    borderColor: "rgba(218, 223, 225, 1)",
    paddingBottom: hp(0.3),
    flexDirection: "row",
  },
  leftBordercolor: {
    left: wp(2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  leftQTYBordercolor: {
    left: wp(27),
  },
  barcolorHeader: {
    color: "rgba(218, 223, 225, 1)",
    bottom: hp(0.2),
    width: 15,
  },
  barcolor: {
    color: "rgba(218, 223, 225, 1)",
    bottom: hp(0.2),
    fontSize: 35,
    fontWeight: "100",
  },
  ItemNameHeader: {
    left: wp(6),
    fontWeight: "600",
  },
  ItemNameText: {
    left: wp(4),
    width: 63,
    fontWeight: "200",
    alignSelf: "center",
  },
  QTYheader: {
    marginLeft: wp(25),
    fontWeight: "600",
  },

  QTYText: {
    marginLeft: wp(28),
    width: 26,
    fontWeight: "200",
    alignSelf: "center",
  },
  leftPriceBordercolor: {
    left: wp(8),
  },
  PriceHeader: {
    left: wp(10),
    fontWeight: "600",
  },
  PriceText: {
    left: wp(10),
    fontWeight: "200",
    alignSelf: "center",
  },
  AddMoreItembutton: {
    backgroundColor: "#DC0000",
    height: hp(5),
    borderRadius: 0,
    bottom: hp(2.5),
  },
  leftTotalBordercolor: {
    left: wp(42),
  },
  uppertextCreatedBy: {
    color: "rgba(0,0,0,0.3)",
  },
  fotterbtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "rgba(218, 223, 225, 1)",
    marginHorizontal: wp(2),
  },
  bottombutton: {
    width: wp(45),
    height: hp(5),
    borderRadius: 0,
    backgroundColor: "#DC0000",
  },
  fotterContainer: {
    // flex: 1,
    justifyContent: "flex-end",
    bottom: hp(1),
  },
});
