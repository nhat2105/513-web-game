import React from "react";
import pfp_1 from "../assets/pfp1.png";
import { useSelector } from 'react-redux'; 

const GameProfile = ({ playerName, points, currentPlayerTurn }) => { 
    // Ensure randomInt is an integer between 1 and 2
    // const randomInt = Math.floor(Math.random() * 2) + 1;

    const currentTurn = () => {
        console.log("Current player turn: ", currentPlayerTurn)
        if(currentPlayerTurn === playerName) {
            return "gameProfile-body-currentturn";
        } else {
            return "gameProfile-body";
        };
    };

    return (
        <div className = {currentTurn()}>
            {/* {randomInt === 1 && <img src={pfp_1} className="gameProfile-userIcon" alt="User Icon 1" />} */}
            {/*randomInt === 2 && */<img src="../default_user_icon.png" className="gameProfile-userIcon" alt="User Icon 2" />}
            
            <div className="gameProfile-userInfo"> 
                <div id="gameProfile-words">Player: {playerName}</div>
                <div>Points: {points}</div>
            </div>
        </div>
    );
};

export default GameProfile;
