import React from 'react';

import SinglePlayerCardGame from '../components/SinglePlayerCardGame';


const SinglePlayerGameBoard = () => {
    const [gamePoints, setGamePoints] = React.useState(0);

    return(
        <body className='singleplayer-board'> 
            <SinglePlayerCardGame gamePoints = {gamePoints} setGamePoints = {setGamePoints}/>
            <div>
                <a className='singleplayer-quit-button' href = "/">Quit Game</a>
                <h2 className='singleplayer-points'>
                    Points: {gamePoints}
                </h2>
            </div>
        </body>
    );
}

export default SinglePlayerGameBoard;