// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/isAuthenticated'; // Import the function

const ProtectedRoute = ({ children }) => {
  const isVerified = isAuthenticated(); // Get authentication status

  return isVerified ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
