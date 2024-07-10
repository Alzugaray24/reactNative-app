import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTapNavigator from "./BottomTapNavigator";
import AuthTapNavigator from "./AuthTapNavigator";
import { useSelector } from "react-redux";

const Navigator = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <NavigationContainer>
      {user !== null ? <BottomTapNavigator /> : <AuthTapNavigator />}
    </NavigationContainer>
  );
};

export default Navigator;

const styles = StyleSheet.create({});
