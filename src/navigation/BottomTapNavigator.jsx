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
        header: () => <Header title={getTitle(route.name)} />, // Dynamic title based on route name
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Tienda") {
            iconName = "store";
          } else if (route.name === "Carrito de Compras") {
            iconName = "shopping-cart";
          } else if (route.name === "Ordenes de Compra") {
            iconName = "receipt";
          } else if (route.name === "Productos Favoritos") {
            iconName = "heart";
          } else if (route.name === "Mi Perfil") {
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
      <Tab.Screen name="Tienda" component={HomeStackNavigator} />
      <Tab.Screen name="Carrito de Compras" component={CartStackNavigator} />
      <Tab.Screen name="Ordenes de Compra" component={OrderStackNavigator} />
      <Tab.Screen
        name="Productos Favoritos"
        component={FavoriteStackNavigator}
      />
      <Tab.Screen name="Mi Perfil" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

const getTitle = (routeName) => {
  if (routeName === "Tienda") {
    return "Thot Computación"; // Set your store name here
  } else {
    return routeName; // Default to route name if not specified
  }
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
