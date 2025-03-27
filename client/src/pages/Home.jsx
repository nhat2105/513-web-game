import React from 'react'
import DaRules from '../components/DaRules'

const Home = () => {
  const [showRules, setShowRules] = React.useState(false);
  const toggleRules = () => setShowRules(!showRules);
  return(
    <body>
      {<DaRules showRules = {showRules} setShowRules={setShowRules}/>}
      <br/>
      <div class = "home-login-button">
        <a href = "/login" id = "input-button">Login</a>
      </div>
      <div class = "home-introduction">
        <h1 class = "home-title">Welcome to Card Pairs</h1>
        <p class = "home-subtitle">A game of memory</p>
        <img class = "home-logo" src='../513-cardlogo.png'/>
      </div>
      <div class = "home-buttons-list">
        <a href = "/create" id = "input-button">Create Game</a>
        <a href = "/join" id = "input-button">Join Game</a>
        <a id = "rules-button" onClick={toggleRules}>Rules</a>
      </div>
    
    </body>
  )
}

export default Home