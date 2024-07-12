import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../global/colors";
import Search from "../components/Search";
import ProductItem from "../components/ProductItem.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setProductsByCategory } from "../features/Shop/ShopSlice.js";
import { useGetProductsByCategoryQuery } from "../services/shopServices.js";

const ItemListCategory = ({ navigation, route }) => {
  const categorySelected = useSelector(
    (state) => state.shop.value.categorySelected
  );

  const filteredProducts = useSelector(
    (state) => state.shop.value.filteredProducts
  );

  const { data: products } = useGetProductsByCategoryQuery(categorySelected);

  const dispatch = useDispatch();

  useEffect(() => {
    if (products) {
      dispatch(setProductsByCategory(categorySelected));
    }
  }, [categorySelected, dispatch, products]);

  return (
    <View style={styles.flatListContainer}>
      <Search goBack={() => navigation.goBack()} />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <ProductItem product={item} navigation={navigation} />
        )}
        keyExtractor={(producto) => producto.id.toString()}
      />
    </View>
  );
};

export default ItemListCategory;

const styles = StyleSheet.create({
  flatListContainer: {
    width: "100%",
    backgroundColor: colors.green300,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
