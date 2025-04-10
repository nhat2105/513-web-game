import React, { use, useState } from 'react';
import CardGame from '../components/CardGame';
import GameProfile from '../components/GameProfile';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MultiplayerWait from '../components/MultiplayerWait';
import {useEffect} from 'react';

const MultiplayerGameBoard = () => {
    const roomName = useParams();
    const gamestate = useSelector((state) => state.game.gameState);
    console.log("Game state: ", gamestate);
    const [maxPlayers, setMaxPlayers] = useState("");
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState("");
    const [style,setStyle] = useState("");
    const [players,setPlayers] = useState([]);
    useEffect(() => {
        setMaxPlayers(gamestate.maxPlayers);
        setCurrentPlayerTurn(gamestate.players[gamestate.currentTurnIndex].username);
        if(gamestate.gamestyle === "Red & Gold") {
            console.log("Red & Gold style selected")
            setStyle("redgold");
        } else if (gamestate.gamestyle === "Purple & Yellow") {
            setStyle ("purpleyellow");
        } else {
            setStyle("");
        }
        setPlayers(gamestate.players);
    },[gamestate])
    // function getGameStyle() {
    //     if(gamestate.gamestyle === "Red & Gold") {
    //         console.log("Red & Gold style selected")
    //         return "redgold";
    //     } else if (gamestate.gamestyle === "Purple & Yellow") {
    //         return "purpleyellow";
    //     } else {
    //         return "";
    //     }

    // }

    return (
        <div id = {style}>
          <div className='gameboard-game-page'>
            <div className='gameboard-cardgame'>
                <CardGame roomName={roomName} />
            </div>
            <MultiplayerWait currentPlayers = {players.length} totalPlayers={maxPlayers}/>
            {/* {console.log("Initial game state using dispatch: ", gamestate)} */}
            <div className='gameboard-userboard'>
                {players.map((player, i) => (
                    <GameProfile key={i} playerName={player.username} points={player.score} currentPlayerTurn = {currentPlayerTurn}/>
                ))}
            </div>
          </div>
        </div>
    );
};

export default MultiplayerGameBoard;