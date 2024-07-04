import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import CategoryItem from "../components/CategoryItem";
import { colors } from "../global/colors";
import { useSelector } from "react-redux";
import { useGetCategoriesQuery } from "../services/shopServices";

const Home = ({ navigation, route }) => {
  // const categories = useSelector((state) => state.shop.value.categories);

  const user = useSelector((state) => state.auth.value.user);

  console.log(user);

  const { data: categories } = useGetCategoriesQuery();

  return (
    <View style={styles.flatListContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={(category) => category}
        data={categories}
        renderItem={({ item }) => (
          <CategoryItem category={item} navigation={navigation} />
        )}
      />
    </View>
  );
};

export default Home;

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
