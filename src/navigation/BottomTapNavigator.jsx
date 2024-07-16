import React from "react";
import { View, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStackNavigator from "./HomeStackNavigator";
import CartStackNavigator from "./CartStackNavigator";
import OrderStackNavigator from "./OrderStackNavigator";
import Header from "../components/Header";
import { colors } from "../global/colors";
import { FontAwesome5 } from "@expo/vector-icons";
import ProfileStackNavigator from "./ProfileStackNavigator";
import FavoriteStackNavigator from "./FavoriteStackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        header: () => <Header title={route.name} />,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Shop") {
            iconName = "store";
          } else if (route.name === "Cart") {
            iconName = "shopping-cart";
          } else if (route.name === "Order") {
            iconName = "receipt";
          } else if (route.name === "Favorite") {
            iconName = "heart";
          } else if (route.name === "profile") {
            iconName = "user-alt";
          }

          return (
            <View style={styles.tabIcon}>
              <FontAwesome5
                name={iconName}
                size={size}
                color={focused ? colors.black : colors.tealBlue}
              />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Shop" component={HomeStackNavigator} />
      <Tab.Screen name="Cart" component={CartStackNavigator} />
      <Tab.Screen name="Order" component={OrderStackNavigator} />
      <Tab.Screen name="Favorite" component={FavoriteStackNavigator} />
      <Tab.Screen name="profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.blueLight,
    height: 60,
  },
  tabIcon: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});

export default BottomTabNavigator;
