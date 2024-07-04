import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import HomeStackNavigator from "./HomeStackNavigator";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthTapNavigator from "./AuthTapNavigator";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navigator = () => {
  const user = useSelector((state) => state.auth.value.user);

  return (
    <NavigationContainer>
      {user !== null ? <BottomTapNavigator /> : <AuthTapNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
