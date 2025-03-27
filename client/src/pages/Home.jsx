import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

// import { guestLogin } from '../axios/api';
const Home = () => {
  const navigate = useNavigate(); // useNavigate hook for routing
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    // Check localStorage when the component mounts
    if (localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  // // Function to handle guest login
  // const handleGuest = async () => {

  //   try {
  //     // const response = await guestLogin(); // Call the backend for guest token
  //     // const { token, role } = response.data;

  //     // localStorage.setItem('token', token);
  //     // localStorage.setItem('role', role); // Store the guest role

  //     navigate('/'); // Redirect to the game page after login
  //   } catch (error) {
  //     console.error('Error logging in as guest', error);
  //   }
  // };

  // Redirect to the login page for regular users
  const handleLogin = () => {
    navigate('/login'); 
  };

  return(
    <body>
      <br/>
      {!isLoggedIn &&<div class = "home-login-button">
        <a href = "/login" id = "input-button" onClick={handleLogin}>Login</a>
      </div> }
      <div class = "home-introduction">
        <h1 class = "home-title">Welcome to Card Pairs</h1>
        <p class = "home-subtitle">A game of memory</p>
        <img class = "home-logo" src='../513-cardlogo.png'/>
      </div>
      <div class = "home-buttons-list">
        <a href = "/Sgame" id = "input-button">Single Player</a>
        {isLoggedIn && <a href = "/create" id = "input-button">Create Game</a>}
        <a href = "/join" id = "input-button">Join Game</a>
        <a id = "rules-button">Rules</a>
      </div>
    
    </body>
  )
}


export default Home;
