import React, { useState, useEffect } from 'react';
import { initializeSocket } from "../socket";
import Card from "../components/Card";

const GamePlay = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState(null);
    const [canClick, setCanClick] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const socket = initializeSocket(); 

            socket.connect(); // Connect only when token is available

            socket.on('game_state', (game) => {
                setGameState(game);
                setFlippedCards(game.flippedCards);
                setMatchedPairs(game.matchedPairs);

                const currentPlayer = game.players[game.currentTurnIndex];
                if (currentPlayer && currentPlayer.username === playerName) {
                    setCanClick(true);
                    // console.log("YEAH SHOULD BE TRUE ON FIRST GUEST")
                } else {
                    setCanClick(false);
                }
            });

            socket.on('message', (message) => {
                console.log(message);
            });

            return () => {
                socket.off('game_state');
                socket.off('message');
            };
        }
    }, [playerName]);

    const handleCreateRoom = () => {
        const socket = initializeSocket();
        socket.emit('create_room', { roomName, difficulty: 'easy', count: 8, playerName });
    };

    const handleJoinRoom = () => {
        const socket = initializeSocket();
        socket.emit('join_room', { username: playerName, roomName });
    };

    const handleFlipCard = (index) => {
        if (!gameState || flippedCards.length >= 2 || !canClick || flippedCards.includes(index)) return;

        setFlippedCards((prev) => [...prev, index]); 
        const socket = initializeSocket();
        socket.emit('flip_card', { roomName, index, playerName });

        setFlippedCards([]);
    };

    return (
        <div>
            <h1>Memory Game</h1>
            <div>
                <input
                    type="text"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                />
                <button onClick={handleCreateRoom}>Create Room</button>
                <button onClick={handleJoinRoom}>Join Room</button>
            </div>

            <div className="card-grid">
                {gameState && gameState.shuffledArray.map((value, index) => (
                    <Card
                        key={index}
                        id={value}
                        value={value}
                        isClicked={flippedCards.includes(index)}
                        onClickF={() => handleFlipCard(index)}
                        matched={matchedPairs.includes(value)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GamePlay;
