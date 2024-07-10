import { StyleSheet, Text, View, Alert, Linking, Platform } from "react-native";
import * as Location from "expo-location";
import * as IntentLauncher from "expo-intent-launcher";
import * as Application from "expo-application";
import React, { useEffect, useState } from "react";

const LocationSelectorScreen = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        Alert.alert(
          "Permission Required",
          "Please enable location services in your settings.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => openAppSettings() },
          ]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const openAppSettings = () => {
    if (Platform.OS === "ios") {
      Linking.openURL("app-settings:");
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_APPLICATION_DETAILS_SETTINGS,
        { data: `package:${Application.applicationId}` }
      );
    }
  };

  console.log(location);

  return (
    <View style={styles.container}>
      <Text style={styles.addressTitle}>My address: </Text>
      {location ? (
        <View style={styles.addressContainer}>
          <Text>Lat: {location.coords.latitude} </Text>
          <Text>Long: {location.coords.longitude} </Text>
        </View>
      ) : (
        <View style={styles.noAddressContainer}>
          <Text>{errorMsg}</Text>
        </View>
      )}
    </View>
  );
};

export default LocationSelectorScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  addressContainer: {
    height: 200,
    width: 200,
    borderWidth: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 30,
  },

  noAddressContainer: {},
});
