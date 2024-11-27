import React, { useEffect, useState } from 'react';
import ChatPage from './components/ChatPage';
import EditProfile from './components/EditProfile';
import Home from './components/Home';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Profile from './components/Profile';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import Layout from './components/Layout'; 
import CreatePost from './components/CreatePost';
import CreatePostStep2 from './components/CreatePostStep2';
import Settings from './components/Settings'; 
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import { Provider } from'react-redux';
// import store from './redux/store';
// import { PersistGate } from'redux-persist/integration/react';
// import { persistStore } from'redux-persist';
// import axios from 'axios';
// // import { ToastContainer, toast } from'react-toastify';
// // import'react-toastify/dist/ReactToastify.css';
// import { setAuthUser } from './redux/authSlice';
import Explore from './components/Explore'; 
import MapComponent from './components/MapComponent'; // Import the MapComponent

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element:<Home />
      },
      {
        path: '/profile/:id',
        element: <Profile />
      },
      {
        path: '/account/edit',
        element: <EditProfile />
      },
      {
        path: '/chat',
        element: <ChatPage /> 
      },
      {
        path: '/create-post',
        element: <CreatePost />
      },
      {
        path: '/create-post-step2',
        element: <CreatePostStep2 open={true} setOpen={() => {}} /> 
      },
      {
        path: '/settings', 
        element: <Settings />
      },
      {
        path: '/explore',
        element: <Explore />
      },
      {
        path: '/map',
        element: <MapComponent /> // Add the Map route
      },
      // {
      //   path: '/location',
      //   element: <LocationMap /> // Add the LocationMap route
      // },
    ]
  },
  {
    path: '/login',
    element: <Layout><Login /></Layout>
  },
  {
    path: '/signup',
    element: <Layout><Signup /></Layout>
  },
  {
    path: '/forgot-password',
    element: <Layout><ForgotPassword /></Layout>
  },
  {
    path: '/verify-otp',
    element: <Layout><VerifyOtp/></Layout>
  },
  {
    path: '/reset-password',
    element: <Layout><ResetPassword/></Layout>
  }
]);

export default function App() {
  return (
    <RouterProvider router={browserRouter} />
  );
}