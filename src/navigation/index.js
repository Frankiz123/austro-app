import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  SignIn,
  SearchItem,
  NewOrder,
  Dashboard,
  ItemDetails,
  Merchants,
  MedicalStore,
  Location,
  Orders,
  Attendance,
  Journey,
} from "@containers";
import { Text } from "react-native";
import { createDrawerNavigator, DrawerContent } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { DrawerScreen } from "./drawernavigation";

const HomeStack = createStackNavigator();

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <>
      <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor: "#5cbbff",
          activeTintColor: "#ffffff",
        }}
        drawerContent={(props) => <DrawerScreen {...props} />}
      >
        <Drawer.Screen name="Orders" component={Orders} />
        <Drawer.Screen name="SearchItem" component={SearchItem} />
        <Drawer.Screen name="Merchants" component={Merchants} />
        <Drawer.Screen name="Journey" component={Journey} />
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="NewOrder" component={NewOrder} />
        <Drawer.Screen name="MedicalStore" component={MedicalStore} />
        <Drawer.Screen name="Attendance" component={Attendance} />
        <Drawer.Screen name="Location" component={Location} />
      </Drawer.Navigator>
    </>
  );
};

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <HomeStack.Navigator initialRouteName="SignIn">
        <HomeStack.Screen
          name="SignIn"
          component={SignIn}
          options={{ title: "" }}
        />
        <HomeStack.Screen
          name="Home"
          component={DrawerNavigation}
          options={{ title: "" }}
        />

        <HomeStack.Screen name="NewOrder" component={NewOrder} />
        <HomeStack.Screen name="SearchItem" component={SearchItem} />
        <HomeStack.Screen name="Merchants" component={Merchants} />
        <HomeStack.Screen name="MedicalStore" component={MedicalStore} />
        <HomeStack.Screen name="ItemDetails" component={ItemDetails} />
        {/* <HomeStack.Screen name="NewOrder" component={NewOrder} />
        <HomeStack.Screen name="Merchants" component={Merchants} />
        <HomeStack.Screen name="MedicalStore" component={MedicalStore} />
        <HomeStack.Screen name="Location" component={Location} />
        <HomeStack.Screen name="SearchItem" component={SearchItem} /> */}
        {/* <HomeStack.Screen name="SearchItem" component={SearchItem} />
        <HomeStack.Screen name="ItemDetails" component={ItemDetails} />
        <HomeStack.Screen name="SignIn" component={SignIn} options={{}} />
        <HomeStack.Screen name="Merchants" component={Merchants} />
        <HomeStack.Screen name="Dashboard" component={Dashboard} />
        <HomeStack.Screen name="NewOrder" component={NewOrder} />
        <HomeStack.Screen name="MedicalStore" component={MedicalStore} />
        <HomeStack.Screen name="Orders" component={Orders} />
        <HomeStack.Screen name="Map" component={Map} />
        <HomeStack.Screen name="Location" component={Location} /> */}
        {/* <HomeStack.Screen name="Location" component={Location} /> */}
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
