import React from 'react';

import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';

const GameBoard = () => {
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

export default GameBoard