import React from 'react'

const Home = () => {
  return(
    <div>
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
    
    </div>
  )
}

export default Home