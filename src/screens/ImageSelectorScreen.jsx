import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import AddButton from "../components/AddButton";
import { useDispatch } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { setImageCamara, setImageProfile } from "../features/Auth/AuthSlice";
import { usePostProfileImageMutation } from "../services/shopServices";
import { useSelector } from "react-redux";

const ImageSelectorScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const localId = useSelector((state) => state.auth.localId);
  const [triggerSaveProfileImage, result] = usePostProfileImageMutation();

  const dispatch = useDispatch();

  const verifyCamaraPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) {
      alert("Camera permission is required to use this feature");
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const isCamaraOk = await verifyCamaraPermission();
    if (isCamaraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [9, 16],
        base64: true,
        quality: 0.2,
      });

      if (!result.canceled) {
        const imageUri = `data:image/jpeg;base64,${result.assets[0].base64}`;
        setImage(imageUri);
      }
    }
  };

  const confirmImage = async () => {
    dispatch(setImageProfile(image));
    triggerSaveProfileImage({ image, localId });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {image === null ? (
        <>
          <View style={styles.noImgContainer}>
            <Text>No hay ninguna foto...</Text>
          </View>
          <AddButton title="Tomar una foto" onPress={pickImage} />
        </>
      ) : (
        <>
          <Image source={{ uri: image }} style={styles.img} />
          <AddButton title="Tomar otra foto" onPress={pickImage} />
          <AddButton title="Confirmar foto" onPress={confirmImage} />
        </>
      )}
    </View>
  );
};

export default ImageSelectorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  noImgContainer: {
    height: 200,
    width: 200,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  img: {
    height: 200,
    width: 200,
    marginBottom: 20,
  },
});
