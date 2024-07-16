import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "../global/colors";

const ActionButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.green700,
    alignItems: "center",
    borderRadius: 12,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.black,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default ActionButton;
