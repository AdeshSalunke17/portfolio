import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData : {}
}

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        saveUserData : (state, action) => {
            state.userData = action.payload;
        }
    }
});

export const { saveUserData } = userSlice.actions;
export default userSlice.reducer;