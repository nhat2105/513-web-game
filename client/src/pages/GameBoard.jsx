import React from 'react';

import CardGame from '../components/CardGame';

const GameBoard = () => {
    return (
        <body>
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                <CardGame />
            </div>
            <div className='gameboard-userboard'>
            </div>
          </div>
        </body>
    );
};

export default GameBoard