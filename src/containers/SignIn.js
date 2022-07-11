import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";
import { Input, Button, showAlert } from "@components";
import { actions } from "@actions";
import { loginSuccess } from "@reducers";
import { useSelector, useDispatch } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import SplashScreen from "react-native-splash-screen";

export function SignIn(props) {
  const { navigation } = props;
  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.login);
  // const [username, serUserName] = useState("austroapp");
  // const [password, setPassword] = useState("@B34eF%R4%");
  const [username, serUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMainLoading, setMainLoading] = useState(true);
  useEffect(() => {
    SplashScreen.hide();
    if (loginData?.data?.token) {
      // navigation.replace("Dashboard");
      navigation.replace("Home", { screenName: "Merchants" });
    }
    setMainLoading(false);
  }, []);
  const onLoginPress = async () => {
    if (username.length > 0 && password.length > 0) {
      setIsLoading(true);
      const loginResp = await actions.getLoginData({
        username,
        password,
      });
      console.log("login respssss", loginResp);
      if (loginResp?.token) {
        dispatch(loginSuccess(loginResp));
        // navigation.replace("Dashboard");
        navigation.replace("Home", { screenName: "Merchants" });
      } else {
        showAlert("Login", "Invalid Credentials");
      }
    } else {
      showAlert("Login", "All fields are required");
    }
    setIsLoading(false);
  };
  if (isMainLoading) {
    return <ActivityIndicator size="small" color={"white"} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require("../assests/images/login.jpeg")}
          style={styles.img}
        />
      </View>
      <Input
        iconName={"ios-person-outline"}
        placeholder={"username"}
        onChangeText={(text) => serUserName(text)}
        value={username}
        autoCapitalize={"none"}
      />
      <View style={{ flexDirection: "row" }}>
        <Input
          iconName={"ios-lock-closed-outline"}
          placeholder={"Password"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
      </View>
      <Button
        isLoading={isLoading}
        onPress={onLoginPress}
        style={{ marginTop: 50 }}
      >
        Login
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  inputcontainer: {
    marginTop: 10,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    bottom: hp(10),
  },
  img: {
    width: wp(40),
    height: hp(15),
  },
});
