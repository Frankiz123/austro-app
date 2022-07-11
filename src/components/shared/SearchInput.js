import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const { width: WIDTH } = Dimensions.get("window");

export const SearchInput = (props) => {
  const { title, iconName, onChangeText, placeholder } = props;
  return (
    <>
      <Icon
        name={iconName}
        size={20}
        color={"grey"}
        style={{ ...styles.inputIcon, ...props.style }}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"rgba(10, 15, 15,0.3)"}
        underlineColorAndroid="transparent"
        style={{ ...styles.input, ...props.style }}
        onChangeText={onChangeText}
      />
    </>
  );
};

const styles = StyleSheet.create({
  inputcontainer: {
    marginTop: 10,
  },
  inputIcon: {
    position: "absolute",
    top: 15,
    left: 20,
  },
  input: {
    height: 50,
    fontSize: 16,
    paddingLeft: 50,
    borderBottomWidth: 0.5,
    color: "#000",
  },
});
