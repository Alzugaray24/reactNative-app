import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    localId: null,
    imageCamara: null,
    profileImage: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.email;
      state.token = action.payload.idToken;
      state.localId = action.payload.localId;
    },
    setLogout: (state, action) => {
      state.user = null;
      state.token = null;
      state.localId = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.localId = null;
      state.profileImage = null;
    },
    setImageCamara: (state, action) => {
      state.imageCamara = action.payload;
    },
    setImageProfile: (state, action) => {
      state.profileImage = action.payload;
    },
  },
});

export const {
  setUser,
  setLogout,
  clearUser,
  setImageCamara,
  setImageProfile,
} = authSlice.actions;

export default authSlice.reducer;
