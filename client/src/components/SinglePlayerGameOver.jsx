import React from "react";

const SinglePlayerGameOver = ({ gamePoints}, {gameOverScreen, setGameOverScreen}) => {
    if (gamePoints != 15) return null;
    return (
        <div className="singleplayer-gameover-background">
            <div className="singleplayer-gameover-container">
                <div className="singleplayer-gameover-format">
                <h1>Game Over</h1>
                <h2>Would You Like To Start a New Game?</h2>
                <h2>Points: {gamePoints}</h2>
                <br/>
                <div className="singleplayer-gameover-button-position">
                    <a href="/" id = "gameover-button">Quit Game</a>
                    <a id = "gameover-button" href = "">New Game</a>
                </div>
                </div>
            </div>
        </div>
    );
};

export default SinglePlayerGameOver;