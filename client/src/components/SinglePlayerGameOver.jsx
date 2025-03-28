import React from "react";

const SinglePlayerGameOver = () => {
    return (
        <div className="singleplayer-gameover-background">
            <div className="singleplayer-gameover-container">
            <h1>Game Over</h1>
            <a href="/">Quit Game</a>
            <button onClick={"history.go(0);"}>New Game</button>
            </div>
        </div>
    );
};

export default SinglePlayerGameOver;