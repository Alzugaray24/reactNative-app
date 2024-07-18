import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { useDispatch } from "react-redux";
import { addCartItem } from "../features/Cart/CartSlice";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../global/colors";

const FavoriteDetail = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addCartItem({ ...product, quantity: 1 }));
    alert("Producto agregado al carrito");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text>Ir atrás</Text>
        <AntDesign name="arrowleft" size={24} color="black" />
      </TouchableOpacity>
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <TouchableOpacity style={styles.actionButton} onPress={handleAddToCart}>
          <Text style={styles.actionButtonText}>Agregar al carrito</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FavoriteDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: colors.green900,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: colors.gray700,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: colors.blueDark,
  },
  actionButton: {
    backgroundColor: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 20,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: colors.blueDark,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
  },
});
