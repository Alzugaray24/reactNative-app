import React, { useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
} from "react-native";
import { colors } from "../global/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch } from "react-redux";
import { setFavoriteItems } from "../features/Shop/ShopSlice";
import { deleteFavorite } from "../db/favorite";

const FavItem = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleFavoritePress = async () => {
    dispatch(setFavoriteItems({ favorite: product }));

    try {
      await deleteFavorite({ id: `${product.id}` });
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 1000);
    } catch (error) {
      Alert.alert("Error al eliminar favorito:", error);
    }
  };

  const handleViewDetails = () => {
    navigation.navigate("favoriteDetail", { product }); // Pasando el producto como parámetro
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={{ uri: product.thumbnail }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleViewDetails} style={styles.detailsButton}>
          <Icon name="information-circle" size={24} color={colors.blue} />
        </Pressable>
        <Pressable onPress={handleFavoritePress} style={styles.favoriteButton}>
          <Icon name="heart" size={24} color={colors.red} />
        </Pressable>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Eliminado de favoritos</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default FavItem;

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: colors.tealBlue,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
    backgroundColor: colors.white,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 30,
  },
  infoContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  title: {
    color: colors.green900,
    fontSize: 18,
    fontWeight: "bold",
  },
  price: {
    color: colors.green700,
    fontSize: 16,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  detailsButton: {
    padding: 10,
    marginRight: 10,
  },
  favoriteButton: {
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: colors.green900,
  },
});
