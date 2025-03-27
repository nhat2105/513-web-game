import React from 'react';

import CardGame from '../components/CardGame';
const SinglePlayerGameBoard = () => {
    return(
        <body className='singleplayer-board'> 
            <CardGame/>
            <div>
                <a className='singleplayer-quit-button' href = "/">Quit Game</a>
                <h2 className='singleplayer-points'>
                    Points: {0}
                </h2>
            </div>
        </body>
    );
}

export default SinglePlayerGameBoard;