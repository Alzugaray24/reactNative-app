import { StyleSheet, TextInput, View, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

const InputText = ({
  error,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default InputText;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 5,
    backgroundColor: "white",
  },
  inputError: {
    borderColor: colors.red,
  },
  errorText: {
    color: colors.red,
    marginTop: 5,
    marginLeft: 5,
  },
});
