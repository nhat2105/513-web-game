import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
// import { guestLogin } from '../axios/api';
const Home = () => {
  return(
    <body>
      <br/>
      <div class = "home-login-button">
        <a href = "/login" id = "input-button">Login</a>
      </div>
      <div class = "home-introduction">
        <h1 class = "home-title">Welcome to Card Pairs</h1>
        <p class = "home-subtitle">A game of memory</p>
      </div>
      <div class = "home-buttons-list">
        <a href = "/create" id = "input-button">Create Game</a>
        <a href = "/join" id = "input-button">Join Game</a>
        <a>Rules</a>
      </div>
    
    </body>
  )
}


export default HomePage;
