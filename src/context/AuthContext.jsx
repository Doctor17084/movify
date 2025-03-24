import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.get('http://localhost:5000/api/auth/verifyToken', {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setUser(response.data.user); // Set user info if token is valid
      })
      .catch(() => {
        localStorage.removeItem('authToken');
        setUser(null); // Remove user info if token is invalid
      });
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('authToken', userData.token); // Store token in localStorage
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null); // Clear user info
  };

  // Helper function to check if the user is an admin
  const isAdmin = () => {
    return user && user.role === 'admin'; // Check if the user has an 'admin' role
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
