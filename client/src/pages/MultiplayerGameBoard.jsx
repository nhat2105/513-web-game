import React, { useState } from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MultiplayerWait from '../components/MultiplayerWait';

const MultiplayerGameBoard = () => {
    const roomName = useParams();
    const gamestate = useSelector((state) => state.game.gameState);
    const maxPlayers = gamestate.maxPlayers;


    return (
          <div className='gameboard-game-page'>
            <MultiplayerWait currentPlayers = {gamestate.players.length} totalPlayers={maxPlayers}/>
            <div className='gameboard-cardgame'>
                <CardGame roomName={roomName} />
            </div>
            {/* {console.log("Initial game state using dispatch: ", gamestate)} */}
            <div className='gameboard-userboard'>
                {gamestate.players.map((player, i) => (
                    <GameProfile key={i} playerName={player.username} points={player.score}/>
                ))}
            </div>
          </div>
    );
};

export default MultiplayerGameBoard;