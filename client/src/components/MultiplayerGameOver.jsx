import React from "react";

const MultiplayerGameOver = ({ players, roomHost, playerName }) => {
    const winner = players[0];
    return (
        <div style={{fontFamily: 'sans-serif'}} className="multiplayer-gameover-background">
            <div className="multiplayer-gameover-container">
                <div className="multiplayer-gameover-format">
                <h1>Game Over</h1>
                <h2>Would You Like To Start a New Game?</h2>
                <h2>Winner: {winner.username}</h2>
                <br/>
                <div className="multiplayer-gameover-button-position">
                    <a href="/" id = "gameover-button">Quit Game</a>
                    {(roomHost === playerName ) && <a id = "gameover-button" href = "/create">New Game</a>}
                    {(roomHost !== playerName) && <a id = "gameover-button" href = "/join">New Game</a>}
                </div>
                </div>
            </div>
        </div>
    );
};

export default MultiplayerGameOver;