import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token: null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      console.log(action.payload, "redux");
        console.log("action payload sign in", action.payload);
        console.log( "action payload current user signin",action.payload.validUser);
        console.log("state.token sign in",state.token);
        console.log("action .payloadsign in", action.payload);
      state.currentUser = action.payload.validUser;
      state.token = action.payload.token;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      console.log( "action payload update",action.payload);
      console.log( "action payload current user update",action.payload.validUser);
             console.log("state.token update", state.token);
             console.log("action .payload update", action.payload);
             console.log("action .payload.token update", action.payload.token);
      state.currentUser = action.payload.validUser; //add data too
      state.token = action.payload.token;
      state.loading = false;
    },
    updateUserFailure: (state) => {
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state) => {
      console.log("state.currentUser", state.currentUser);
      state.currentUser = null;
      state.token = null;
    },
    deleteUserFailure: (state) => {
      state.loading = false;
    },
    signOut: (state) => {
      state.currentUser = null;
      state.token = null;
    },
  },
});

export const {
  signInStart,
  signInSuccess,
  signInFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  signOut,
} = userSlice.actions;
export default userSlice.reducer;
