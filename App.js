import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/global/colors";
import Navigator from "./src/navigation/Navigator";
import { Provider } from "react-redux";
import store from "./src/store";
import { initSessionsDb } from "./src/db/sessions";
import { initFavoritesDb } from "./src/db/favorite";

export default function App() {
  const [fontsLoaded] = useFonts({
    Josefin: require("./assets/JosefinSans-Regular.ttf"),
  });

  const initializeDB = async () => {
    try {
      await initSessionsDb();
      await initFavoritesDb();
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  useEffect(() => {
    initializeDB();
  }, []);

  if (!fontsLoaded) {
    return null;
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
