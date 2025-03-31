import React from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';
import { useSelector } from 'react-redux';

const MultiplayerGameBoard = () => {
  const gameState = useSelector((state) => state.game.gameState);

    return (
        <body>
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                {/* {console.log("Initial game state using dispatch: ", gameState)} */}
                <CardGame intialGameState={gameState} />
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