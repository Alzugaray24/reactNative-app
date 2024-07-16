import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import InputText from "../components/InputText";
import ActionButton from "../components/ActionButton";
import { colors } from "../global/colors";
import { useSignUpMutation } from "../services/authServices";
import { signupSchema } from "../validations/auth/signupSchema";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [triggerSignUp, { isLoading, error }] = useSignUpMutation();
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [errorConfirm, setErrorConfirm] = useState(null);

  const handleSignUp = async () => {
    try {
      signupSchema.validateSync({
        email,
        password,
        confirmPassword,
      });

      await triggerSignUp({ email, password }).unwrap();

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setErrorEmail(null);
      setErrorPassword(null);
      setErrorConfirm(null);

      Alert.alert("Éxito", "Cuenta creada exitosamente");
    } catch (err) {
      console.log(err.path);
      switch (err.path) {
        case "email":
          setErrorEmail(err.message);
          break;
        case "confirmPassword":
          setErrorConfirm(err.message);
          break;
        case "password":
          setErrorPassword(err.message);
          break;
        default:
          Alert.alert(
            "Error",
            "Ha ocurrido un error al registrarse. Inténtalo nuevamente."
          );
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <InputText
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        error={errorEmail}
        style={styles.input}
      />
      <InputText
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        error={errorPassword}
        style={styles.input}
      />
      <InputText
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        autoCapitalize="none"
        error={errorConfirm}
        style={styles.input}
      />
      <ActionButton
        title="Registrarse"
        onPress={handleSignUp}
        isLoading={isLoading}
        style={styles.button}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.tabBar,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.blueDark,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray300,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
  error: {
    color: colors.red,
    marginTop: 10,
  },
});

export default SignUpScreen;
