import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../global/colors";
import AddButton from "../components/AddButton";
import { useGetProfileImageQuery } from "../services/shopServices";
import { setImageProfile, setLogout } from "../features/Auth/AuthSlice";
import { logoutSession, querySessions } from "../db/sessions";
import { logoutFavorites } from "../db/favorite";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const localId = useSelector((state) => state.auth.localId);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const { data, isLoading } = useGetProfileImageQuery(localId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.image) {
      dispatch(setImageProfile(data.image));
    } else {
      dispatch(setImageProfile(null));
    }
  }, [data]);

  const handleLogout = async () => {
    try {
      const sessions = await querySessions();
      if (sessions.length > 0) {
        const localId = sessions[0].localId;
        await logoutSession(localId);
        await logoutFavorites(localId);
        dispatch(setLogout());
        dispatch(setImageProfile(null));
        Alert.alert("Sesión cerrada con éxito");
      } else {
        Alert.alert("No se encontraron sesiones.");
      }
    } catch (error) {
      Alert.alert("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          profileImage
            ? { uri: profileImage }
            : require("../../assets/user.png")
        }
        style={styles.img}
      />
      <AddButton
        title="Agregar foto de perfil"
        onPress={() => navigation.navigate("ImageSelector")}
      />
      <AddButton
        title="Mi dirección"
        onPress={() => navigation.navigate("LocationSelector")}
      />
      <AddButton title="Cerrar Sesión" onPress={handleLogout} />
      <Text style={styles.emailText}>
        <Text style={styles.emailLabel}>Email:</Text>{" "}
        <Text style={styles.emailValue}>{user}</Text>
      </Text>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  loadingContainer: {
    justifyContent: "center",
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  emailText: {
    fontSize: 16,
    color: colors.gray800,
    marginTop: 10,
    textAlign: "center",
  },
  emailLabel: {
    fontWeight: "bold",
    color: colors.green900,
  },
  emailValue: {
    color: colors.green700,
  },
});

export default ProfileScreen;
