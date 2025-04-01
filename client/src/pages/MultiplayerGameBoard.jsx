import React from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const MultiplayerGameBoard = () => {
  const gameState = useSelector((state) => state.game.gameState);
  const roomName = useParams();

    return (
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                {/* {console.log("Initial game state using dispatch: ", gameState)} */}
                <CardGame intialGameState={gameState} roomName={roomName} />
            </div>
            <div className='gameboard-userboard'>
                <GameProfile />
                <GameProfile />
                <GameProfile />
                <GameProfile />
                <GameProfile />
            </div>
          </div>
    );
};

export default MultiplayerGameBoard;