import React, { useEffect, useState } from 'react';
import { initializeSocket } from '../socket';
import { useDispatch } from 'react-redux';
import { setGameState } from '../redux/gameSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

//TODO: handling not your turn + direct link
const CardGame = ({roomName}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const socket = initializeSocket();

  const [flippedCards, setFlippedCards] = useState([]); // Cards that are flipped (indexes)
  const [matchedPairs, setMatchedPairs] = useState([]); // Matched pairs (values)
  const [difficulty, setDifficulty] = useState(""); // Difficulty level for card amount
  //const [gameState, setGameState] = useState(intialGameState); // Game state from backend
  const [canClick, setCanClick] = useState(false); // Whether the current player can flip cards
  const playerName = sessionStorage.getItem("username") || sessionStorage.getItem("nickname"); 

  const gameState = useSelector((state) => state.game.gameState);

  if (!gameState){
    navigate("/join")
  }

  useEffect(() => {
    // Connect to the socket
    socket.connect();

    // Listen for the game state from the backend
    socket.on('game_state', (game) => {
      dispatch(setGameState(game));
      setFlippedCards(game.flippedCards);
      setMatchedPairs(game.matchedPairs);
      
      // adjusts the card layout based on the difficulty level
      setDifficulty(game.difficulty);

      const currentPlayer = game.players[game.currentTurnIndex];
      console.log("Player turn ", currentPlayer);

      if (currentPlayer && currentPlayer.username === playerName) {
        setCanClick(true); // Allow the current player to flip cards
        
      } else {
        setCanClick(false); // Prevent flipping if it's not the player's turn
      }
    });

    socket.on('message', (message) => {
      console.log(message); // Handle general game messages
      // if (message === "Cards match!"){
      //   matchedPairs.push(flippedCards[0]);
      //   matchedPairs.push(flippedCards[1]);
      // }
    });

    socket.on("not_your_turn", (obj) => {
      setCanClick(false);
    });

    // socket.on('cards_match', (matchedPairValues) => {
    //   setMatchedPairs(matchedPairValues)
    // });

    return () => {
      socket.off('game_state');
      socket.off('message');
      socket.off('cards_match');
    };
  }, [playerName, socket, canClick, matchedPairs, flippedCards, dispatch]);

  // Game clicking logic
  const handleClick = (index, value) => {
    if (matchedPairs.includes(value))return; // can't click on mapped cards
    if (flippedCards.includes(index))return; //not clicking on the same card to cheat
   
    if (!gameState || flippedCards.length >= 2 || !canClick) return;
    
    setFlippedCards((prev) => [...prev, index]); 
    // console.log("Flipped cards: ", index, " value ", value)
    socket.emit('flip_card', { roomName, index, playerName });
    //setFlippedCards([]);
  };

  const handleDisplay = () => { 
    console.log("DIFFICULTY ", difficulty)
    if(difficulty === "easy"){  
      return "cardgame-display-12";
    }else if(difficulty === "medium"){ 
      return "cardgame-display-20";
    }else{ 
      return "cardgame-display-30";
    }
  };

  return (
    <div className={handleDisplay()}>
      { console.log("GAME STATE ", gameState) }
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