import { StyleSheet, Text, Pressable } from "react-native";

import Card from "./Card";
import { colors } from "../global/colors";

import { useDispatch } from "react-redux";
import { setCategorySelected } from "../features/Shop/ShopSlice";

const CategoryItem = ({ category, navigation }) => {
  const dispatch = useDispatch();

  const handleNavigate = () => {
    dispatch(setCategorySelected(category));
    navigation.navigate("ItemListCategory");
  };

  return (
    <Card style={styles.cardContainer}>
      <Pressable onPress={handleNavigate}>
        <Text style={styles.text}>{category}</Text>
      </Pressable>
    </Card>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    backgroundColor: colors.lightBlue,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    color: colors.black,
  },
});
