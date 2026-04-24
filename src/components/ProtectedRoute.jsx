// src/components/ProtectedRoute.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return null; // App.js se encarga de mostrar Login
  }

  return children;
};

export default ProtectedRoute;