import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { addCartItem } from "../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePostCartItemMutation } from "../services/shopServices";
import { useGetProductByIdQuery } from "../services/shopServices";

const ItemDetail = ({ navigation, route }) => {
  const { productId } = route.params;
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { data: product } = useGetProductByIdQuery(productId);
  const [triggerPost, { isLoading, isSuccess, isError, error }] =
    usePostCartItemMutation();

  const onAddCart = () => {
    if (product) {
      // Agregar producto al carrito local
      dispatch(addCartItem({ ...product, quantity: 1 }));

      // Enviar el producto al backend
      const cartItem = { ...product, quantity: 1, user: user };
      triggerPost(cartItem);
    }
  };

  if (!product || !Object.keys(product).length) {
    return (
      <View style={styles.container}>
        <Text>No se ha seleccionado ningún producto.</Text>
        <Button onPress={() => navigation.goBack()} title="Volver" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={() => navigation.goBack()} title="Volver" />
      <View style={styles.detailContainer}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Button title="Agregar al carrito" onPress={onAddCart} />
      </View>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  detailContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
});
