import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/global/colors";

import Navigator from "./src/navigation/Navigator";

import { Provider } from "react-redux";
import store from "./src/store";
import { init } from "./src/db";

export default function App() {
  const [fontsLoaded] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  const initializeDB = async () => {
    try {
      await init();
    } catch (error) {
      console.log("Initialization DB failed");
      console.log(error.message);
    }
  };

  useEffect(() => {
    initializeDB();
  }, []);

  if (!fontsLoaded) {
    return null; // Muestra un componente de carga hasta que las fuentes estén cargadas
  }

  return (
    <SafeAreaView style={styles.container}>
      <Provider store={store}>
        <Navigator />
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.lightBlue, // Cambiado a color de fondo lightBlue
  },
});
