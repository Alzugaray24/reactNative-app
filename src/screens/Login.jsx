import React, { useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import InputText from "../components/InputText";
import ActionButton from "../components/ActionButton";
import { colors } from "../global/colors";
import { useLoginMutation } from "../services/authServices";
import { setUser } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations/auth/loginSchema";
import { decodeJwtToken } from "../utils/jwtDecode";

const LoginScreen = ({ navigator }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, result] = useLoginMutation();
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const validations = loginSchema.validateSync({ email, password });

      const result = await triggerLogin({
        email,
        password,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      const { idToken, email: userEmail } = result.data;

      // Decodificar el token manualmente
      const decodedToken = decodeJwtToken(idToken);

      dispatch(
        setUser({
          data: { idToken, email: userEmail, localId: decodedToken.user_id },
        })
      );

      Alert.alert("Éxito", "Inicio de sesión exitoso");
    } catch (error) {
      if (error.path) {
        switch (error.path) {
          case "email":
            setErrorEmail(error.message);
            break;
          case "password":
            setErrorPassword(error.message);
            break;
          default:
            Alert.alert("Error", "El email o contraseña no son válidos");
            break;
        }
      } else {
        Alert.alert("Error", "Error al iniciar sesion");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <InputText
        error={errorEmail}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputText
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
        error={errorPassword}
      />
      <ActionButton title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.green300,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
});

export default LoginScreen;
