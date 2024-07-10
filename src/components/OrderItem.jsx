import React from "react";
import { StyleSheet, Text, View } from "react-native";

const OrderItem = ({ order }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order for: {order.user}</Text>
      <Text style={styles.total}>Total: ${order.total}</Text>
      {order.cartItems.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text>Quantity: {item.quantity}</Text>
          <Text>Price: ${item.price}</Text>
        </View>
      ))}
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  total: {
    fontSize: 14,
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
