import React from "react";

const MultiplayerWait = ({currentPlayers, totalPlayers}) => {
    if (currentPlayers === totalPlayers) {
        return null;
    }
    return (
        <div className="multiplayer-wait-background">
            <div className="multiplayer-wait-container">
                <h1>Please Wait</h1>
                <h2>Waiting for players: {currentPlayers} / {totalPlayers} </h2>
            </div>
        </div>
    );
};

export default MultiplayerWait;