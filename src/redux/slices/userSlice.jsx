import { createSlice } from "@reduxjs/toolkit";



export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    token:null,
    loading: false,
  },
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      console.log(action.payload, "redux");
      state.currentUser = action.payload;
      state.token=action.payload.token;
      state.loading = false;
    },
    signInFailure: (state) => {
      state.loading = false;
    },

    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.currentUser = action.payload;
     state.token = action.payload.token;
      state.loading = false;
    },
    updateUserFailure: (state) => {
      
      state.loading = false;
    },
    deleteUserStart:(state)=>{
      state.loading=true
    },
    deleteUserSuccess:(state)=>{
      state.currentUser=null
    },
    deleteUserFailure:(state)=>{
      state.loading=false
    },
  },
});

export const {signInStart,signInSuccess,signInFailure,updateUserStart,updateUserSuccess,updateUserFailure,deleteUserSuccess,deleteUserStart,deleteUserFailure}=userSlice.actions
export default userSlice.reducer