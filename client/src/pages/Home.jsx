import DaRules from '../components/DaRules'
import UserMenu from '../components/UserMenu';
import React, { useState, useEffect } from 'react';

// import { guestLogin } from '../axios/api';
const Home = () => {
  const [showRules, setShowRules] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isUserIconClicked, setIsUserIconClicked] = useState(false);

  useEffect(() => {
    // Check sessionStorage when the component mounts
    if (sessionStorage.getItem("loggedIn") === "true") {
      setLoggedIn(true);
    }
  }, []);

  const toggleRules = () => {
    setShowRules(!showRules);
    console.log("Rules button clicked");
  };

  const toggleUserIcon = () => {
    setIsUserIconClicked(!isUserIconClicked);
    console.log("User icon clicked");
  };

  const iconApperance = () => {
    if (isUserIconClicked) {
      return "home-user-icon-pressed";
    } else {
      return "home-user-icon";
    }
  };

  return(
    <div>
      {<DaRules showRules = {showRules} setShowRules={setShowRules}/>}
      {!isLoggedIn &&<div className = "home-login-button">
        <a href = "/login" id = "input-button">Login</a>
      </div> }
      {isLoggedIn && <img className={iconApperance()} src='../default_user_icon.png' onClick={toggleUserIcon}/>}
      {isUserIconClicked && <UserMenu isLoggedIn = {isLoggedIn} setLoggedIn = {setLoggedIn} setIsUserIconClicked = {setIsUserIconClicked}/>}
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
