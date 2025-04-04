import React from "react";

const GameProfile = ({playerName, points}) => { 
    return (
        <div className="gameProfile-body">
            <img src="placeholder" className="gameProfile-userIcon"></img>
            <div className="gameProfile-userInfo"> 
                <div id = "gameProfile-words">Player: {playerName}</div>
                <div>Points: {points}</div>
            </div>
        </div>
    );
};

export default GameProfile;