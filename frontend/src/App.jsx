// App.jsx
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
import Layout from './components/Layout'; // Import the Layout component
import CreatePost from './components/CreatePost'; // Import the CreatePost component
import CreatePostStep2 from './components/CreatePostStep2'; // Import the CreatePostStep2 component
import Settings from './components/Settings'; // Import the Settings component
// import LocationMap from './components/LocationMap'; // Import the LocationMap component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/chatSlice';
import { setLikeNotification } from './redux/rtnSlice';
import ProtectedRoutes from './components/ProtectedRoutes';
import SplashScreen from './components/SplashScreen'; // Import the SplashScreen component

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
        element: <ChatPage /> // Ensure ChatPage is protected
      },
      {
        path: '/create-post',
        element: <CreatePost />
      },
      {
        path: '/create-post-step2',
        element: <CreatePostStep2 open={true} setOpen={() => {}} /> // Pass open and setOpen props
      },
      {
        path: '/settings', // New Settings route
        element: <Settings />
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