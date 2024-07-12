import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../global/colors";
import AddButton from "../components/AddButton";
import { useGetProfileImageQuery } from "../services/shopServices";
import { setImageProfile } from "../features/Auth/AuthSlice";
import { getLastProfileImage } from "../utils/lastImageSelector";

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
