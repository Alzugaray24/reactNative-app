import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import InputText from "../components/InputText";
import ActionButton from "../components/ActionButton";
import { colors } from "../global/colors";
import { useLoginMutation } from "../services/authServices";
import { setUser } from "../features/Auth/AuthSlice";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations/auth/loginSchema";
import { decodeJwtToken } from "../utils/jwtDecode";
import { querySessions, insertSession } from "../db";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, result] = useLoginMutation();
  const [errorEmail, setErrorEmail] = useState(null);
  const [errorPassword, setErrorPassword] = useState(null);
  const [existingSession, setExistingSession] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    try {
      const sessions = await querySessions();

      if (sessions.length > 0) {
        setExistingSession(true);
      }
    } catch (error) {
      Alert.alert({ errorCheckExistingSession: error.message });
    }
  };

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

      const decodedToken = decodeJwtToken(result.data.idToken);

      if (!existingSession) {
        await insertSession({
          email: result.data.email,
          localId: decodedToken.user_id,
          token: result.data.idToken,
        })
          .then((result) => {})
          .catch((err) => {
            Alert.alert({ errInsertData: err.message });
          });
      } else {
        Alert.alert("Ya hay una sesion activa");
      }

      dispatch(
        setUser({
          email: result.data.email,
          localId: decodedToken.user_id,
          token: result.data.idToken,
        })
      );

      Alert.alert("Éxito", "Inicio de sesión exitoso");
    } catch (error) {
      Alert.alert("Error durante el proceso de login:", error);
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
        Alert.alert("Error", "Error al iniciar sesión");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <InputText
        error={errorEmail}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <InputText
        placeholder="Contraseña"
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
