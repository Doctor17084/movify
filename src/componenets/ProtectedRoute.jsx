// ProtectedRoute.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // If the user is not logged in, redirect to the login page (or home)
  if (!user) {
    return <Navigate to="/" />;
  }

  // If the user is logged in, allow access to the child components (Dashboard in this case)
  return children;
};

export default ProtectedRoute;
