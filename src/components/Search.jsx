import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../global/colors";
import { useEffect, useState, useCallback } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProductsByWord } from "../features/Shop/ShopSlice";

const Search = ({ error = "", goBack = () => {} }) => {
  const [keyword, setKeyword] = useState("");
  const dispatch = useDispatch();
  const products = useSelector((state) => state.shop.value.products);

  const filterProducts = useCallback(() => {
    dispatch(setFilteredProductsByWord({ keyword, products }));
  }, [dispatch, keyword, products]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search..."
          value={keyword}
          onChangeText={setKeyword}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <Pressable onPress={() => setKeyword("")}>
        <FontAwesome6 name="eraser" size={24} color="black" />
      </Pressable>
      <Pressable onPress={goBack}>
        <AntDesign name="back" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 18,
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    gap: 4,
    width: "65%",
  },
  input: {
    width: 250,
    padding: 8,
    fontSize: 18,
    backgroundColor: colors.green700,
    color: colors.gray100,
    borderRadius: 10,
  },
  errorText: {
    color: colors.white,
    fontSize: 16,
    fontFamily: "Josefin",
  },
});
