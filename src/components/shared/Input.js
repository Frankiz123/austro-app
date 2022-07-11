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
import FontistoIcon from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const { width: WIDTH } = Dimensions.get("window");

export const Input = (props) => {
  const [iconVisible, setIconVisible] = useState(true);
  const showPassHandler = () => {
    if (iconVisible === false) {
      setIconVisible(true);
    } else {
      setIconVisible(false);
    }
  };

  const {
    title,
    secureTextEntry,
    setShowPass,
    onChangeText,
    iconName,
    editable,
    iconType,
    placeholder,
    FontistoIconBool,
    iconStyles,
    closeIconBool,
    closeiconStyles,
    value,
    autoCapitalize,
  } = props;
  return (
    <View style={{ ...styles.inputcontainer, ...props.style }}>
      {FontistoIconBool ? (
        <FontistoIcon
          name={iconName}
          size={20}
          style={{ ...styles.inputIcon, ...iconStyles }}
        />
      ) : (
        <Icon
          name={iconName}
          size={20}
          style={{ ...styles.inputIcon, ...iconStyles }}
        />
      )}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"rgba(0,0,0,0.15)"}
        underlineColorAndroid="transparent"
        style={{ ...styles.input, ...props.style }}
        secureTextEntry={secureTextEntry && iconVisible}
        onChangeText={onChangeText}
        editable={editable}
        value={value}
        autoCapitalize={autoCapitalize}
      />

      {closeIconBool && (
        <Icon
          name={"close"}
          size={20}
          style={{ ...styles.closeinputIcon, ...closeiconStyles }}
        />
      )}
      {secureTextEntry && (
        <TouchableOpacity onPress={showPassHandler} style={styles.btneye}>
          <Icon
            name={iconVisible ? "ios-eye-off-outline" : "ios-eye-outline"}
            size={26}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputcontainer: {
    marginTop: 10,
  },
  inputIcon: {
    position: "absolute",
    top: 12,
    left: 37,
  },
  btneye: {
    position: "absolute",
    top: 8,
    right: 37,
  },
  input: {
    width: WIDTH - 55,
    height: 50,
    borderRadius: 10,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: "rgba(0,0,0,0.15)",
    color: "rgba(0,0,0,0.7)",
    marginHorizontal: 25,
    // marginBottom: 15,
  },
  closeinputIcon: {
    position: "absolute",
    top: 12,
    right: 0,
  },
});
