import React, { useContext, useEffect } from 'react';
import  AuthContext  from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate("/"); // If no token is found, redirect to Home
    } else {
      // Optionally, you can validate the token with the server here
      // If valid, proceed to render the dashboard, else logout
    }
  }, [navigate]);

  if (!user) {
    return <div>გთხოვთ, ავტორიზაცია გაიაროთ.</div>;
  }

  return (
    <div>
      <h2>Welcome to your Dashboard, {user.username}</h2>
    </div>
  );
}

export default Dashboard;
