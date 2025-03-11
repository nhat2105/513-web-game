import React, { useState, useEffect } from 'react';
import { socket } from "../socket/index";
import Card from "../components/Card";

const GamePlay = () => {
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedPairs, setMatchedPairs] = useState([]);
    const [roomName, setRoomName] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        socket.on('game_state', (game) => {
            // Update the game state with the latest data from the backend
            setGameState(game);
            setFlippedCards(game.flippedCards); // Update flipped cards state
            setMatchedPairs(game.matchedPairs); // Update matched pairs state
        });

        socket.on('message', (message) => {
            console.log(message);
        });

        return () => {
            socket.off('game_state');
            socket.off('message');
        };
    }, []);

    const handleCreateRoom = () => {
        socket.emit('create_room', { roomName, difficulty: 'easy', count: 8 });
    };

    const handleJoinRoom = () => {
        socket.emit('join_room', { username: playerName, roomName });
    };

    const handleFlipCard = (index) => {
        if (flippedCards.length < 2 && !flippedCards.includes(index)) {
            setFlippedCards((prev) => [...prev, index]);
            socket.emit('flip_card', { roomName, index });
        }
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
