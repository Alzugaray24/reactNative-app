import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { useSelector } from "react-redux";
import FavItem from "../components/FavItem";
import { colors } from "../global/colors";
import { getDatabaseInfo } from "../db/sessions";
import { queryFavorites } from "../db/favorite";

const FavoriteScreen = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const [favProds, setFavProds] = useState([]);
  const localId = useSelector((state) => state.auth.localId);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const prods = await queryFavorites(localId);
        setFavProds(prods);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [favProds]);

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando favoritos...</Text>
      ) : favProds && favProds.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id.toString()}
          data={favProds}
          renderItem={({ item }) => (
            <FavItem product={item} navigation={navigation} />
          )}
        />
      ) : (
        <Text style={styles.contentText}>No hay productos favoritos</Text>
      )}
    </View>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 18,
  },
});
