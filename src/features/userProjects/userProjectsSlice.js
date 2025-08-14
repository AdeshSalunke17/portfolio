import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userProjects : []
}

const userProjectSlice = createSlice({
    name : 'userProjects',
    initialState,
    reducers : {
        saveUserProjects : (state, action) => {
            state.userProjects = action.payload;
        }
    }
});

export const { saveUserProjects } = userProjectSlice.actions;
export default userProjectSlice.reducer;