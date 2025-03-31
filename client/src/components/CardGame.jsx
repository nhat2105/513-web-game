import React, { useEffect, useState } from 'react';
import { initializeSocket } from '../socket';

const CardGame = ({intialGameState}) => {
  const socket = initializeSocket();
  const [flippedCards, setFlippedCards] = useState([]); // Cards that are flipped (indexes)
  const [matchedPairs, setMatchedPairs] = useState([]); // Matched pairs (values)
  const [gameState, setGameState] = useState(intialGameState); // Game state from backend
  //console.log("Initial game state: ", gameState);
  const [canClick, setCanClick] = useState(false); // Whether the current player can flip cards
  const playerName = localStorage.getItem("username") || "player"; 
  const roomName = localStorage.getItem("roomName") || "";

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
    });

    return () => {
      socket.off('game_state');
      socket.off('message');
    };
  }, [playerName, socket]);

  const handleClick = (index, value) => {
    // Prevent clicks if too many cards are flipped or if it's not the player's turn
    if (!canClick || flippedCards.length >= 2 || flippedCards.includes(index)) return;

    setFlippedCards((prev) => [...prev, index]); // Update flipped cards state

    // Emit flip card event to the backend
    socket.emit('flip_card', { roomName, index, playerName });
  };

  return (
    <div className="cardgame-display">
      {gameState && gameState.shuffledArray.map((card, index) => (
        <div
          key={index}
          className={`cardgame-card 
            ${(flippedCards.includes(index) || matchedPairs.includes(card)) && "cardgame-flipped"}`}
          onClick={() => handleClick(index, card)}
        >
          <div className="cardgame-card-back"></div>
          {card}
        </div>
      ))}
    </div>
  );
}

export default CardGame;


// import {useState} from 'react';

// const values = ["♠", "♣", "♥", "♦", "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J",];

// //create a deck of cards and shuffle them
// const deck = ([...values, ...values].sort(() => 0.5 - Math.random()));
// const defaultState = {index: null, value: null};

// function CardGame() { 
//   const [firstPick, setFirstPick] = useState(defaultState);
//   const [secondPick, setSecondPick] = useState(defaultState);
//   const [remainingCards, setRemainingCards] = useState(deck);
//   const [moves, setMoves] = useState(0);

//   const handleClick = (index, value) => {
//     //selecting the first card or selecting the first card after wrong pair match
//     if (firstPick.index === null || (firstPick.index !== null && secondPick.index !== null)) {
//       setSecondPick(defaultState);
//       setFirstPick({index, value});
//       setMoves((moves) => moves + 1);
//     }
//     //selecting the second card
//     else if (secondPick.index === null && firstPick.index !== index) {
//       setSecondPick({index, value});
//       setMoves((moves) => moves + 1);

//       //compare the two cards
//       //if there is a pair
//       if (firstPick.value === value) {
//         setRemainingCards(remainingCards.filter((card) => card !== value));
//       }
//     }
//   };

//   return (
//     <div className='cardgame-display'>
//       {deck.map((card, index) => {
//         return ( 
//           <div 
//             key={index} 
//             className={`cardgame-card 
//             ${(firstPick.index === index 
//               || secondPick.index === index 
//               || !remainingCards.includes(card)
//             ) && "cardgame-flipped"
//           }`}
//            onClick={() => handleClick(index, card)}
//            >
//             <div className='cardgame-card-back'></div>
//             {card}
//           </div>
//         )
//       })}
//     </div>
//   );
// }

// export default CardGame;