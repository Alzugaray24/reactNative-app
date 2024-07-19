import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
import Card from "./Card";
import { colors } from "../global/colors";

const ProductItem = ({ product, navigation }) => {
  const handleNavigate = () => {
    navigation.navigate("ItemDetail", { productId: product.id });
  };

  return (
    <Card style={styles.card}>
      <Pressable style={styles.content} onPress={handleNavigate}>
        <Text style={styles.title}>{product.title}</Text>
        <Image
          resizeMode="cover"
          style={styles.image}
          source={{ uri: product.thumbnail }}
        />
      </Pressable>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    height: 160,
    width: "100%",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.lightBlue,
    borderRadius: 12,
    shadowColor: colors.gray700,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.blueDark,
    flexShrink: 1,
    marginRight: 10,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 10,
  },
});
