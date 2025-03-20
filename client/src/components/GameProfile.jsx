import React from "react";

const GameProfile = () => { 
    return (
        <div className="gameProfile-body">
            <img src="placeholder" className="gameProfile-userIcon"></img>
            <div className="gameProfile-userInfo"> 
                <div id = "gameProfile-words">Username</div>
                <div>Points: 0</div>
            </div>
        </div>
    );
};

export default GameProfile;