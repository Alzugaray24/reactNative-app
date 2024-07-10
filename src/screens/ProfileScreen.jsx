import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../global/colors";
import AddButton from "../components/AddButton";
import { useGetProfileImageQuery } from "../services/shopServices";
import { setImageProfile } from "../features/Auth/AuthSlice"; // Asumiendo que setImageCamara es la acción correcta para establecer la imagen del perfil

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const localId = useSelector((state) => state.auth.localId);
  const { data, error, isLoading } = useGetProfileImageQuery(localId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setImageProfile(data.image));
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {data && data.image ? (
        <>
          <Image source={{ uri: data.image }} style={styles.img} />
          <AddButton
            title="Add profile picture"
            onPress={() => navigation.navigate("ImageSelector")}
          />
          <AddButton
            title="My Adress"
            onPress={() => navigation.navigate("LocationSelector")}
          />
          <Text>Email: {user}</Text>
        </>
      ) : (
        <>
          <Image source={require("../../assets/user.png")} style={styles.img} />
          <AddButton
            title="Add profile picture"
            onPress={() => navigation.navigate("ImageSelector")}
          />
          <AddButton
            title="My Adress"
            onPress={() => navigation.navigate("LocationSelector")}
          />
          <Text>Email: {user}</Text>
        </>
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  loadingContainer: {
    justifyContent: "center",
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100, // Ajusta según el estilo que desees para la imagen
  },
});
