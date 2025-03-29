import React, { useState } from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';

const MultiplayerGameBoard = () => {
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [roomName, setRoomName] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [gameState, setGameState] = useState(null);
  const [canClick, setCanClick] = useState(false);

    return (
        <body>
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                <CardGame />
            </div>
            <div className='gameboard-userboard'>
                <GameProfile />
                <GameProfile />
                <GameProfile />
                <GameProfile />
                <GameProfile />
            </div>
          </div>
        </body>
    );
};

export default MultiplayerGameBoard;