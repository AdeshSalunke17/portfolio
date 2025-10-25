import { useEffect, useRef, useState } from 'react'
import './App.css'
import { store } from './config/firebaseConfig';
import { getDocs, collection } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux'
import { saveUserData } from './features/user/userSlice'; 
import { saveUserProjects } from './features/userProjects/userProjectsSlice';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';

function App() {
  const dispatch = useDispatch();
  const fetchUserData = async () => {
    const userQuerySnapshot = await getDocs(collection(store, 'userInfo'));
    const userData = userQuerySnapshot.docs[0]?.data();
    const userProjectQuerySnapshot = await getDocs(collection(store, 'userProjects'));
    const userProjects = userProjectQuerySnapshot.docs[0]?.data();
    dispatch(saveUserData(userData));
    dispatch(saveUserProjects(userProjects));
  };
  useEffect(() => {
    fetchUserData();
  },[]);
  return (
    <RouterProvider router={router}/>
  )
}

export default App
