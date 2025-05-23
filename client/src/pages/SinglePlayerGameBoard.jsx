import React from 'react';

import SinglePlayerCardGame from '../components/SinglePlayerCardGame';
import SinglePlayerGameOver from '../components/SinglePlayerGameOver';


const SinglePlayerGameBoard = () => {
    const [gamePoints, setGamePoints] = React.useState(0);
    const [gameOverScreen, setGameOverScreen] = React.useState(false);


    function gameOverCheck(points){
        if(points == 15) {
            setGameOverScreen(true);
        }
        else {
            setGameOverScreen(false);
        }
    };

    return(
        <div className='singleplayer-board'> 
        {<SinglePlayerGameOver gamePoints = {gamePoints}/>}
            <div>
            <SinglePlayerCardGame gamePoints = {gamePoints} setGamePoints = {setGamePoints}/>
            </div>
            <div>
                <a className='singleplayer-quit-button' href = "/">Quit Game</a>
                <h2 className='singleplayer-points'>
                    Points: {gamePoints}
                </h2>
            </div>
        </div>
    );
}

export default SinglePlayerGameBoard;