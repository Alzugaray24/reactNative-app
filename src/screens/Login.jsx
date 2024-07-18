import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import InputText from "../components/InputText";
import ActionButton from "../components/ActionButton";
import { colors } from "../global/colors";
import { useLoginMutation } from "../services/authServices";
import { useDispatch } from "react-redux";
import { setUser } from "../features/Auth/AuthSlice";
import { loginSchema } from "../validations/auth/loginSchema";
import { decodeJwtToken } from "../utils/jwtDecode";
import { querySessions, insertSession } from "../db/sessions";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin] = useLoginMutation();
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
      Alert.alert("Error al verificar sesión existente:", error.message);
    }
  };

  const handleLogin = async () => {
    try {
      loginSchema.validateSync({ email, password });

      const result = await triggerLogin({ email, password });

      if (result.error) {
        throw new Error(result.error.data.error.message);
      }

      const decodedToken = decodeJwtToken(result.data.idToken);

      if (!existingSession) {
        await insertSession({
          email: result.data.email,
          localId: decodedToken.user_id,
          token: result.data.idToken,
        });
      } else {
        Alert.alert("Ya hay una sesión activa");
        return;
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
      if (error.path) {
        if (error.path === "email") {
          setErrorEmail(error.message);
        } else if (error.path === "password") {
          setErrorPassword(error.message);
        }
      } else {
        Alert.alert("Error", error.message);
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
      <ActionButton title="Login" onPress={handleLogin} style={styles.button} />
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
    color: colors.black,
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
    borderColor: colors.gray100,
  },
  button: {
    width: "100%",
    marginTop: 20,
  },
});

export default LoginScreen;
