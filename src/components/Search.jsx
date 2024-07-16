import React, { useEffect, useState, useCallback } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesome6, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredProductsByWord } from "../features/Shop/ShopSlice";
import { colors } from "../global/colors";

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
          placeholderTextColor={colors.gray500}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <Pressable style={styles.iconButton} onPress={() => setKeyword("")}>
        <FontAwesome6 name="eraser" size={24} color={colors.gray700} />
      </Pressable>
      <Pressable style={styles.iconButton} onPress={goBack}>
        <AntDesign name="arrowleft" size={24} color={colors.gray700} />
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
    paddingHorizontal: 20,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginRight: 10,
    backgroundColor: colors.gray100,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 10,
    color: colors.gray800,
  },
  errorText: {
    color: colors.red,
    fontSize: 16,
    marginLeft: 8,
    fontFamily: "Josefin",
  },
  iconButton: {
    padding: 10,
    borderRadius: 12,
  },
});
