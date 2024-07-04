import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shopServices";
import { colors } from "../global/colors";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.value.items);
  const total = useSelector((state) => state.cart.value.total);

  const [triggerPost, result] = usePostOrderMutation();

  const confirmCart = () => {
    triggerPost({ total, cartItems, user: "loggedUser" });
    console.log("Order confirmed");
  };

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>
            No hay ningún producto en el carrito
          </Text>
        </View>
      ) : (
        <View style={styles.cartContent}>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => <CartItem cartItem={item} />}
            keyExtractor={(product) => product.id}
          />

          <View style={styles.orderSummary}>
            <Pressable style={styles.confirmButton} onPress={confirmCart}>
              <Text style={styles.confirmButtonText}>Confirm Order</Text>
            </Pressable>
            <Text style={styles.totalText}>Total: $ {total}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCartText: {
    fontSize: 18,
    color: colors.green700,
  },
  cartContent: {
    flex: 1,
  },
  orderSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  confirmButton: {
    backgroundColor: colors.green700,
    padding: 10,
    borderRadius: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.green900,
  },
});
