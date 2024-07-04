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
    padding: 15,
    backgroundColor: colors.green700, // Ajusta el color según tu esquema de colores
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ActionButton;
