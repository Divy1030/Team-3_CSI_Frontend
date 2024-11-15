import React, { useEffect, useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import MainLayout from './components/MainLayout';
import Signup from './components/Signup';
import ForgotPassword from './components/ForgotPassword';
import VerifyOtp from './components/VerifyOtp';
import ResetPassword from './components/ResetPassword';
import Layout from './components/Layout'; // Import the Layout component
// import LocationMap from './components/LocationMap'; // Import the LocationMap component
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
]);

export default function App() {
  return (
    <RouterProvider router={browserRouter} />
  );
}