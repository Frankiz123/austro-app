import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
const { width: WIDTH } = Dimensions.get("window");
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ItemDetails = (props) => {
  const { item } = props.route.params;
  const keys = Object.keys(item.acf);
  console.log("keys", keys);
  console.log("Item", item);

  return (
    <SafeAreaView style={styles.container}>
      {keys[3] === "items" ? (
        <>
          <View style={styles.listContainer}>
            <View style={styles.headerTextContainer}>
              <View style={{ left: wp(3) }}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.ItemNameHeader}>Order Name</Text>
              <View style={styles.leftQTYBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.QTYheader}>Seller Name</Text>
              <View style={styles.leftPriceBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.BuyerNameHeader}>Buyer Name</Text>
              <View style={styles.leftItemsBordercolor}>
                <Text style={styles.barcolorHeader}>|</Text>
              </View>
              <Text style={styles.ItemText}>Items</Text>
            </View>
          </View>
          <View style={styles.productContainer}>
            <View style={styles.leftBordercolor}>
              <Text style={styles.barcolor}>|</Text>
            </View>
            <Text numberOfLines={3} style={styles.ItemNameText}>
              {item.slug}
            </Text>
            <View style={styles.leftSellerBordercolor}>
              <Text style={styles.barcolor}>|</Text>
            </View>
            <Text style={styles.QTYText}>Anirudh</Text>
            <View style={styles.leftBuyerBordercolor}>
              <Text style={styles.barcolor}>|</Text>
            </View>
            <Text style={styles.PriceText}>MK Bhadra</Text>
            <View style={styles.leftItemvalBordercolor}>
              <Text style={styles.barcolor}>|</Text>
            </View>
            <Text style={styles.ItemValText}>5</Text>
          </View>
        </>
      ) : (
        <ScrollView style={styles.mainScrollContainer}>
          <View>
            <Text style={styles.HeadingText}>{item.title.rendered}</Text>
            <Text numberOfLines={2} style={styles.maintext}>
              {item.slug}
            </Text>
          </View>
          <View style={styles.listingContainer}>
            {keys.map((key) => {
              return (
                <View style={styles.listingvaluesContainer}>
                  <Text style={styles.minHeadingText}>{key}</Text>

                  {key === "items" ? (
                    <Text style={styles.valText}>
                      {item.acf.items[0]?.quantity}
                    </Text>
                  ) : (
                    <Text style={styles.valText}>{item.acf[key]}</Text>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  HeadingText: {
    fontSize: 24,
    fontWeight: "500",
  },
  mainScrollContainer: {
    top: 10,
    left: 10,
  },
  maintext: {},
  listingContainer: {
    top: 10,
  },
  minHeadingText: {
    color: "grey",
    fontWeight: "bold",
  },
  valText: {
    fontWeight: "400",
    fontSize: 18,
  },
  listingvaluesContainer: {
    marginTop: 10,
  },
  listContainer: {
    width: wp(100),
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
    left: wp(6),
  },
  leftSellerBordercolor: {
    right: wp(3),
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
    left: wp(2),
    fontWeight: "bold",
  },
  ItemNameText: {
    left: wp(4),
    width: wp(30),
    fontWeight: "200",
    alignSelf: "center",
  },
  QTYheader: {
    marginLeft: wp(5),
    fontWeight: "bold",
  },

  QTYText: {
    width: wp(15),
    fontWeight: "200",
    alignSelf: "center",
  },
  leftPriceBordercolor: {
    left: wp(4),
  },
  leftItemsBordercolor: {
    left: wp(8),
  },
  leftBuyerBordercolor: {
    left: wp(5),
  },
  leftItemvalBordercolor: {
    left: wp(13.5),
  },
  BuyerNameHeader: {
    left: wp(3),
    fontWeight: "bold",
  },
  PriceText: {
    left: wp(10),
    fontWeight: "200",
    alignSelf: "center",
  },
  ItemValText: {
    marginLeft: wp(20),
    fontWeight: "200",
    alignSelf: "center",
  },
  ItemText: {
    left: wp(8),
    fontWeight: "bold",
    alignSelf: "center",
  },
});
