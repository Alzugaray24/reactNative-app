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
import { setImageProfile } from "../features/Auth/AuthSlice";
import { getLastProfileImage } from "../utils/lastImageSelector";
import { logoutSession } from "../db";
import { setLogout } from "../features/Auth/AuthSlice";
import { querySessions } from "../db";

const ProfileScreen = ({ navigation }) => {
  const user = useSelector((state) => state.auth.user);
  const localId = useSelector((state) => state.auth.localId);
  const profileImage = useSelector((state) => state.auth.profileImage);
  const { data, isLoading } = useGetProfileImageQuery(localId);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const lastProfileImage = getLastProfileImage(data);
      dispatch(setImageProfile(lastProfileImage));
    }
  }, [data]);

  const renderProfileContent = () => {
    if (isLoading) {
      return (
        <View style={[styles.container, styles.loadingContainer]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    const onLogout = async () => {
      try {
        const sessions = await querySessions();
        if (sessions.length > 0) {
          const localId = sessions[0].localId;
          const result = await logoutSession(localId);
          dispatch(setLogout());
          Alert.alert("Sesion cerrada con exito");
        } else {
          Alert.alert("No se encontraron sesiones.");
        }
      } catch (error) {
        Alert.alert("Error al cerrar sesión:", error);
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
          title="Add profile picture"
          onPress={() => navigation.navigate("ImageSelector")}
        />
        <AddButton
          title="My Address"
          onPress={() => navigation.navigate("LocationSelector")}
        />

        <AddButton title="Logout" onPress={() => onLogout()} />
        <Text>Email: {user}</Text>
      </View>
    );
  };

  return renderProfileContent();
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
    borderRadius: 100,
  },
});
