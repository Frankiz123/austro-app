import React, { useEffect, useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  Drawer,
  TouchableRipple,
} from "react-native-paper";
import { useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BarsIcon from "react-native-vector-icons/FontAwesome5";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { resetLoginState } from "@reducers";

const DrawerNavigation = createDrawerNavigator();

export const DrawerScreen = (props) => {
  const loginData = useSelector((state) => state.login.data);
  const { navigation } = props;
  const [nameScreen, setnameScreen] = useState("Orders");
  const [active, setActive] = useState(false);
  const [inActive, setinActive] = useState(true);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(resetLoginState());
    navigation.replace("SignIn");
  };

  const checkActiveHandler = (name) => {
    switch (name) {
      case name === "Merchants":
        return setActive(true), setinActive(false);
      case name === "NewOrder":
        return setActive(true), setinActive(false);
      case name === "MedicalStore":
        return setActive(true), setinActive(false);
      case name === "Location":
        return setActive(true), setinActive(false);
      case name === "SearchItem":
        return setActive(true), setinActive(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          style={{ left: 10 }}
          onPress={() => navigation.toggleDrawer()}
        >
          <BarsIcon name="bars" size={24} />
        </TouchableOpacity>
      ),
      title: nameScreen,
      headerRight: () => <View></View>,
    });
    if (nameScreen === "Orders") {
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={{
              right: 10,
              backgroundColor: "red",
              width: wp(25),
              height: hp(4),
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.replace("NewOrder")}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>
              Create Order
            </Text>
          </TouchableOpacity>
        ),
        title: "New Orders",
      });
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 40,
          }}
        >
          <Avatar.Icon
            size={84}
            color="#000"
            style={{ backgroundColor: "#fff" }}
            icon="account-circle"
          />
          <View style={{ width: wp(50) }}>
            <Text>Name: {loginData?.user_display_name} </Text>
            <Text>Email: {loginData?.user_email} </Text>
          </View>
        </View>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "Orders" ? true : false}
            icon={({ size, color }) => (
              <Icon
                name="order-bool-ascending-variant"
                color={color}
                size={size}
              />
            )}
            onPress={() => {
              navigation.navigate("Orders", { screenName: "Orders" });
              setnameScreen("Orders");
            }}
            label={"Orders"}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "Merchants" ? true : false}
            icon={({ size, color }) => (
              <Icon name="home-circle" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("Merchants", { screenName: "Merchants" });
              setnameScreen("Merchants");
            }}
            label={"Merchants"}
          />
        </Drawer.Section>
        {/* <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "NewOrder" ? true : false}
            icon={({ size, color }) => (
              <Icon
                name="order-bool-ascending-variant"
                color={color}
                size={size}
              />
            )}
            onPress={() => {
              navigation.navigate("NewOrder", { screenName: "NewOrder" });
              setnameScreen("NewOrder");
            }}
            label={"New Order"}
          />
        </Drawer.Section> */}
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "Attendance" ? true : false}
            icon={({ size, color }) => (
              <Icon name="bag-personal" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("Attendance", { screenName: "Attendance" });
              setnameScreen("Attendance");
            }}
            label={"Attendance"}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "Journey" ? true : false}
            icon={({ size, color }) => (
              <Icon name="motorbike" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("Journey", {
                screenName: "Journey",
              });
              setnameScreen("Journey");
            }}
            label={"Journey"}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "MedicalStore" ? true : false}
            icon={({ size, color }) => (
              <Icon name="medical-bag" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("MedicalStore", {
                screenName: "MedicalStore",
              });
              setnameScreen("MedicalStore");
            }}
            label={"Medical Store"}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "Location" ? true : false}
            icon={({ size, color }) => (
              <Icon name="location-enter" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("Location", { screenName: "Location" });
              setnameScreen("Location");
            }}
            label={"Location"}
          />
        </Drawer.Section>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "SearchItem" ? true : false}
            icon={({ size, color }) => (
              <Icon name="shield-search" color={color} size={size} />
            )}
            onPress={() => {
              navigation.navigate("SearchItem", { screenName: "SearchItem" });
              setnameScreen("SearchItem");
            }}
            label={"Search Item"}
          />
        </Drawer.Section>

        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            focused={nameScreen === "SignOut" ? true : false}
            icon={({ size, color }) => (
              <Icon name="exit-to-app" color={color} size={size} />
            )}
            onPress={logout}
            label={"Sign Out"}
          />
        </Drawer.Section>
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  activeColor: {
    backgroundColor: "black",
    color: "red",
    width: wp(100),
    height: hp(100),
  },
});
