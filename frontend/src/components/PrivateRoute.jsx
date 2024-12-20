// PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { user } = useSelector(store => store.auth);

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;