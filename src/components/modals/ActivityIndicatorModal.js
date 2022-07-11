/**
 * Food Delivery - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from "react";
import {
  ActivityIndicator,
  Modal,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { color } from "react-native-reanimated";
import layout from "../shared/layout";

// import colors, layout
// import Colors from '../../theme/colors';
// import Layout from '../../theme/layout';

// ActivityIndicatorModal Styles
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.52)",
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: layout.SCREEN_WIDTH - 5 * layout.MEDIUM_MARGIN,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  title: {
    paddingVertical: 8,
    fontWeight: "700",
    fontSize: 15,
    color: "#000",
  },
  message: {
    marginBottom: 15,
    padding: 8,
    fontWeight: "400",
    fontSize: 15,
    color: "#212121",
    textAlign: "center",
  },
});

// ActivityIndicatorModal Props
type Props = {
  message: string,
  onRequestClose: () => {},
  statusBarColor: string,
  title: string,
  visible: boolean,
  color: String,
};

// ActivityIndicatorModal
const ActivityIndicatorModal = ({
  message,
  onRequestClose,
  statusBarColor = "rgba(0, 0, 0, 0.52)",
  title,
  visible,
  color,
}: Props) => (
  <Modal
    animationType="none"
    transparent
    visible={visible}
    onRequestClose={onRequestClose}
    color
  >
    <StatusBar backgroundColor={statusBarColor} />
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        {/* <Text style={styles.title}>{title}</Text> */}

        {message !== "" && message !== undefined && (
          <Text style={styles.message}>{message}</Text>
        )}

        <ActivityIndicator animating color={color} size="large" />
      </View>
    </View>
  </Modal>
);

export default ActivityIndicatorModal;
