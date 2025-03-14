import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import { guestLogin } from '../axios/authService';

const HomePage = () => {
  const navigate = useNavigate(); // useNavigate hook for routing
  const [loading, setLoading] = useState(false);

  // Function to handle guest login
  const handleGuest = async () => {
    setLoading(true);

    try {
      // const response = await guestLogin(); // Call the backend for guest token
      // const { token, role } = response.data;

      // localStorage.setItem('token', token);
      // localStorage.setItem('role', role); // Store the guest role

      setLoading(false);
      navigate('/game'); // Redirect to the game page after login
    } catch (error) {
      console.error('Error logging in as guest', error);
      setLoading(false);
    }
  };

  // Redirect to the login page for regular users
  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="home-page">
      <h1>Welcome to the Multiplayer Game</h1>
      <button className="btn" onClick={handleGuest} disabled={loading}>
        {loading ? 'Loading...' : 'Enter as Guest'}
      </button>
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default HomePage;
