import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import { addCartItem } from "../features/Cart/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "../services/shopServices";
import { colors } from "../global/colors";
import { AntDesign } from "@expo/vector-icons";
import { queryFavorites, insertFavorite } from "../db/favorite";

const ItemDetail = ({ navigation, route }) => {
  const localId = useSelector((state) => state.auth.localId);
  const { productId } = route.params;
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(productId);

  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const showMessageModal = (msg) => {
    setMessage(msg);
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      setMessage("");
    }, 1000);
  };

  const onAddCart = () => {
    if (product) {
      dispatch(addCartItem({ ...product, quantity: 1 }));
      showMessageModal("Agregado al carrito");
    }
  };

  const onAddFavorite = async () => {
    if (product) {
      try {
        const allProds = await queryFavorites(localId);
        const existe = allProds.some((item) => item.id === `${product.id}.0`);

        if (existe) {
          Alert.alert("Aviso", "El producto ya está en tu lista de favoritos.");
        } else {
          await insertFavorite({
            id: product.id,
            title: product.title,
            localId: localId,
            thumbnail: product.thumbnail,
            brand: product.brand,
            category: product.category,
            description: product.description,
            discountPercentage: product.discountPercentage,
            stock: product.stock,
            price: product.price,
          });

          showMessageModal("Agregado a favoritos");
        }
      } catch (error) {
        Alert.alert("Error", "Ocurrió un error al agregar a favoritos");
      }
    }
  };

  if (!product || !Object.keys(product).length) {
    return (
      <View style={styles.container}>
        <Text>No se ha seleccionado ningún producto.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text>Ir atras</Text>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={onAddCart}>
            <Text style={styles.actionButtonText}>Agregar al carrito</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={onAddFavorite}>
            <Text style={styles.actionButtonText}>Agregar a favoritos</Text>
          </TouchableOpacity>
        </View>
        {isLoading && <ActivityIndicator style={styles.loadingIndicator} />}
        {isError && (
          <Text style={styles.errorText}>Error: {isError.message}</Text>
        )}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showMessage}
        onRequestClose={() => setShowMessage(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.successMessage}>{message}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ItemDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  detailContainer: {
    alignItems: "center",
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
  },
  description: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
    color: "#666",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#2f9c0a",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    backgroundColor: colors.black,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  errorText: {
    marginTop: 10,
    color: "#ff0000",
    fontStyle: "italic",
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
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  successMessage: {
    color: colors.black,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: "center",
    elevation: 5,
  },
});
