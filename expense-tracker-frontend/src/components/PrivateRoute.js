import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('authToken'); // Check if the user is logged in

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
