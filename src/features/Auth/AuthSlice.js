import { createSlice } from "@reduxjs/toolkit";
import { decodeJwtToken } from "../../utils/jwtDecode";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    localId: null,
    imageCamara: null,
    profileImage: null, // Nuevo estado para la imagen de perfil
  },
  reducers: {
    setUser: (state, action) => {
      const decodedToken = decodeJwtToken(action.payload.data.idToken);
      state.user = action.payload.data.email;
      state.token = action.payload.data.idToken;
      state.localId = decodedToken.user_id; // Almacenar el localId
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.profileImage = null; // Limpiar la imagen de perfil al salir de sesión
    },
    setImageCamara: (state, action) => {
      state.imageCamara = action.payload;
    },
    setImageProfile: (state, action) => {
      console.log("entrex");
      state.profileImage = action.payload; // Establecer la imagen de perfil
    },
  },
});

export const { setUser, clearUser, setImageCamara, setImageProfile } =
  authSlice.actions;

export default authSlice.reducer;
