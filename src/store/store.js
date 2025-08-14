import { configureStore } from '@reduxjs/toolkit'
import userSlice from '../features/user/userSlice'
import userProjectSlice from '../features/userProjects/userProjectsSlice'
export const store = configureStore({
  reducer: {
    user : userSlice,
    userProjects : userProjectSlice
  },
})