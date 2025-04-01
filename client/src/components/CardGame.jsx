import React, { useEffect, useState } from 'react';
import { initializeSocket } from '../socket';
// import { useDispatch } from 'react-redux';

//TODO: disable clicking on matched cards
const CardGame = ({intialGameState, roomName}) => {
  const socket = initializeSocket();
  const [flippedCards, setFlippedCards] = useState([]); // Cards that are flipped (indexes)
  const [matchedPairs, setMatchedPairs] = useState([]); // Matched pairs (values)
  const [gameState, setGameState] = useState(intialGameState); // Game state from backend
  const [canClick, setCanClick] = useState(false); // Whether the current player can flip cards
  const playerName = localStorage.getItem("username") || "player"; 
  const [remainingCards, setRemainingCards] = ([])

  useEffect(() => {
    // Connect to the socket
    socket.connect();

    // Listen for the game state from the backend
    socket.on('game_state', (game) => {
      setGameState(game);
      setFlippedCards(game.flippedCards);
      setMatchedPairs(game.matchedPairs);

      const currentPlayer = game.players[game.currentTurnIndex];
      if (currentPlayer && currentPlayer.username === playerName) {
        setCanClick(true); // Allow the current player to flip cards
        
      } else {
        setCanClick(false); // Prevent flipping if it's not the player's turn
      }
    });

    socket.on('message', (message) => {
      console.log(message); // Handle general game messages
      // if (message === "Cards match!"){
      //   setFlippedCards([]);
      // }
    });

    return () => {
      socket.off('game_state');
      socket.off('message');
    };
  }, [playerName, socket, canClick]);

  const handleClick = (index, value) => {
    //console.log("CALLED")
    if (!gameState || flippedCards.length >= 2) return;
    
    setFlippedCards((prev) => [...prev, index]); 
    // console.log("Flipped cards: ", index, " value ", value)
    socket.emit('flip_card', { roomName, index, playerName });
    //setFlippedCards([]);
  };

  

  return (
    <div className="cardgame-display">
      { gameState && gameState.shuffledArray.map((card, index) => {
        return (
          <div key={index}
            onClick={() => handleClick(index, card)}
            className={`cardgame-card 
            ${(flippedCards.includes(index) || matchedPairs.includes(card)) && "cardgame-flipped"}`}>
            <div className="cardgame-card-back"></div>
            {card}
          </div>
        )
    })}
    </div>
  );
}

export default CardGame;