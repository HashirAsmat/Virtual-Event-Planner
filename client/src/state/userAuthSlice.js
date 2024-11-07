import { createSlice } from "@reduxjs/toolkit";
const persistedUser = localStorage.getItem("userState");
const parsedUser = persistedUser ? JSON.parse(persistedUser) : {};
const userSlice = createSlice({
    name:'user',
    initialState:{
        user: parsedUser.user || null,
        isAuth : parsedUser.isAuth || false,
    },
    reducers:
    {
        setUser(state,action){
            state.user = action.payload; //user object
            state.isAuth = action.payload.isAuth //user Auth permission
        }
    }
})

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
