import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
import Explore from './components/Explore'; 
import MapComponent from './components/MapComponent'; 
import UserSearchProfile from './components/UserSearchProfile';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

const browserRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        )
      },
      {
        path: '/profile/:id',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: '/account/edit',
        element: (
          <PrivateRoute>
            <EditProfile />
          </PrivateRoute>
        )
      },
      {
        path: '/chat',
        element: (
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        )
      },
      {
        path: '/create-post',
        element: (
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        )
      },
      {
        path: '/create-post-step2',
        element: (
          <PrivateRoute>
            <CreatePostStep2 open={true} setOpen={() => {}} />
          </PrivateRoute>
        )
      },
      {
        path: '/settings',
        element: (
          <PrivateRoute>
            <Settings />
          </PrivateRoute>
        )
      },
      {
        path: '/explore',
        element: (
          <PrivateRoute>
            <Explore />
          </PrivateRoute>
        )
      },
      {
        path: '/map',
        element: (
          <PrivateRoute>
            <MapComponent />
          </PrivateRoute>
        )
      },
      {
        path: '/user-profile/:userId',
        element: (
          <PrivateRoute>
            <UserSearchProfile />
          </PrivateRoute>
        )
      }
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