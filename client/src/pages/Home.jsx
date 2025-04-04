import DaRules from '../components/DaRules'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

// import { guestLogin } from '../axios/api';
const Home = () => {
  const [showRules, setShowRules] = useState(false);
  const navigate = useNavigate(); // useNavigate hook for routing
  const [isLoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage when the component mounts
    if (localStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const toggleRules = () => {
    setShowRules(!showRules);
    console.log("Rules button clicked");
  };

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
    console.log("Login button clicked");
  };

  return(
    <div>
      {<DaRules showRules = {showRules} setShowRules={setShowRules}/>}
      <br/>
      {!isLoggedIn &&<div className = "home-login-button">
        <a href = "/login" id = "input-button" /*onClick={handleLogin}*/>Login</a>
      </div> }
      <div className = "home-introduction">
        <h1 className = "home-title">Welcome to Card Pairs</h1>
        <p className = "home-subtitle">A game of memory</p>
        <img className = "home-logo" src='../513-cardlogo.png' alt='card_pair_logo'/>
      </div>
      <div className = "home-buttons-list">
        <a href = "/Sgame" id = "input-button">Single Player</a>
        {isLoggedIn && <a href = "/create" id = "input-button">Create Game</a>}
        <a href = "/join" id = "input-button">Join Game</a>
        <a id = "rules-button" onClick={toggleRules}>Rules</a>
      </div>
    
    </div>
  )
}


export default Home;
