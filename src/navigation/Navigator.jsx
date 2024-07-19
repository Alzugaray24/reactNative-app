import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthTapNavigator from "./AuthTapNavigator";
import { useDispatch, useSelector } from "react-redux";
import { querySessions } from "../db/sessions";
import { setUser } from "../features/Auth/AuthSlice";

const Navigator = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSessions = async () => {
      try {
        const sessions = await querySessions();

        if (sessions.length > 0) {
          const firstSession = sessions[0];
          if (
            firstSession.email &&
            firstSession.localId &&
            firstSession.token
          ) {
            dispatch(
              setUser({
                email: firstSession.email,
                localId: firstSession.localId,
                token: firstSession.token,
              })
            );
          } else {
            Alert.alert(
              "La sesión no contiene todas las propiedades necesarias."
            );
          }
        } else {
          Alert.alert("No se encontraron sesiones.");
        }
      } catch (error) {
        Alert.alert("Error al verificar sesiones:", error.message);
      } finally {
        setLoading(false);
      }
    };

    checkSessions();
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <BottomTapNavigator /> : <AuthTapNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
