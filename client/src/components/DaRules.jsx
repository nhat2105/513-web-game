import {useState} from "react";

const DaRules = ({showRules, setShowRules}) => {
    const toggleRules = () => setShowRules(!showRules);
    if (!showRules) return null;
    return (
        <body className="rules-background">
            <div className="rules-container">
                <button onClick={toggleRules}>X</button>
                <h1>Rules</h1>
                <div>
                    <h2>SinglePlayer</h2>
                    <p>The object of the game is to win the most pairs (2
                        identical cards). </p>
                    <p>   
                        If you turn over two identical cards,
                        the card remains turned over and you score a point. 
                    </p>
                    <p>
                        If you turn over two different cards, the cards will be 
                        reset and you will NOT score a point.
                    </p>
                    <p>
                        The game ends when all pairs have been found.
                    </p>
                </div>
                <div>
                    <h2>Multiplayer</h2>
                    <p>The object of the game is to find the most pairs (2
                        identical cards). </p>
                    <p>The first turn will always go to the host player. </p>
                    <p>Each player takes turns flipping over
                        two cards. </p>
                    <p>   
                        If you turn over two identical cards,
                        the card remains turned over and you score a point. 
                    </p>
                    <p>
                        If you turn over two different cards, the cards will be 
                        reset and you will NOT score a point.
                    </p>
                    <p>
                        The game ends when all pairs have been found and the player with the highest
                        score will be the winner.
                    </p>
                </div>
            </div>
        </body>
    );
};

export default DaRules;