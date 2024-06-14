import { createSlice } from "@reduxjs/toolkit";



export const userSlice=createSlice({
    name:'user',
    initialState:{
        currentUser:null,
        loading:false
    },
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false
        },
        signInFailure:(state)=>{
            state.loading=false
        }
    }

})

export const {signInStart,signInSuccess,signInFailure}=userSlice.actions
export default userSlice.reducer