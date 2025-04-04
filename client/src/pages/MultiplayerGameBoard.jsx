import React from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MultiplayerGameBoard = () => {
    const roomName = useParams();
    const gamestate = useSelector((state) => state.game.gameState);

    return (
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                <CardGame roomName={roomName} />
            </div>
            {/* {console.log("Initial game state using dispatch: ", gamestate)} */}
            <div className='gameboard-userboard'>
                {gamestate.players.map((_, i) => (
                    <GameProfile key={i} />
                ))}
            </div>
          </div>
    );
};

export default MultiplayerGameBoard;